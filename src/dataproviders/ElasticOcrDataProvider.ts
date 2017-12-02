import { IElasticOcrTesterDataProvider } from './IElasticOcrTesterDataProvider';
import { IEndpoint } from '../models/IEndpoint';
import { ILicenseInfo } from '../models/ILicenseInfo';
import { IJob } from '../models/IJob';

export default class ElasticOcrDataProvider implements IElasticOcrTesterDataProvider {

    public endpoint: IEndpoint;

    constructor(endpoint: IEndpoint) {

        this.getLicenseInfo = this.getLicenseInfo.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.addJob = this.addJob.bind(this);
        this.addFile = this.addFile.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.completeJob = this.completeJob.bind(this);
        this.addJobWithoutFile = this.addJobWithoutFile.bind(this);
        this.addJobWithFile = this.addJobWithFile.bind(this);
        this.elasticOcrFetch = this.elasticOcrFetch.bind(this);

        this.endpoint = endpoint;
    }

    public getLicenseInfo(): Promise<ILicenseInfo> {

        return this.elasticOcrFetch('/licenses', 'get', new Headers(), undefined)
            .then((responseJson: JSON) => {

                var licenseInfo: ILicenseInfo = {

                    EndPoint: this.endpoint,
                    Type: responseJson['type'],
                    Region: responseJson['processingRegion'],
                    Enabled: responseJson['enabled']
                };

                return licenseInfo;
            });
    }

    public getJobs(): Promise<IJob[]> {

        return this.elasticOcrFetch('/jobs', 'get', new Headers(), undefined)
            .then((responseJson: JSON[]) => {

                var jobCollection: IJob[] = [];

                responseJson.forEach((job: JSON) => {

                    jobCollection.push({

                        Id: job['id'],
                        Available: job['availableDate'],
                        Completed: job['completedDate'],
                        Created: job['createdDate'],
                        DownloadExpires: job['downloadUrlExpires'],
                        DownloadUrl: job['downloadUrl'],
                        ExceptionMessage: job['exceptionMessage'],
                        Filename: job['filename'],
                        Message: job['message'],
                        Status: job['status']
                    });
                });

                return jobCollection;
            });
    }

    public getJobsByStatus(status: string): Promise<IJob[]> {

        return this.elasticOcrFetch('/jobs/' + status, 'get', new Headers(), undefined)
            .then((responseJson: JSON[]) => {
                console.log(responseJson);
                var jobCollection: IJob[] = [];

                responseJson.forEach((job: JSON) => {

                    jobCollection.push({

                        Id: job['id'],
                        Available: job['availableDate'],
                        Completed: job['completedDate'],
                        Created: job['createdDate'],
                        DownloadExpires: job['downloadUrlExpires'],
                        DownloadUrl: job['downloadUrl'],
                        ExceptionMessage: job['exceptionMessage'],
                        Filename: job['filename'],
                        Message: job['message'],
                        Status: job['status']
                    });
                });

                return jobCollection;
            });
    }

    public addJob(file: File): Promise<boolean> {

        if (!file || !file.name) {

            return this.addJobWithoutFile();
        } else {

            return this.addJobWithFile(file);
        }
    }

    public addFile(jobId: string, file: File): Promise<boolean> {

        if (!file || !file.name) {

            throw new Error('you must select a file!');
        }

        var headers: Headers = new Headers();
        headers.append('filename', file.name);
        headers.append('Content-Type', 'application/octet-stream');

        return this.elasticOcrFetch('/jobs/' + jobId, 'put', headers, file)
            .then((responseJson: JSON) => {

                return true;
            });
    }

    public deleteJob(jobId: string): Promise<boolean> {

        return this.elasticOcrFetch('/jobs/' + jobId, 'delete', new Headers(), undefined)
            .then((responseJson: JSON) => {

                return true;
            });
    }

    public completeJob(jobId: string): Promise<boolean> {

        return this.elasticOcrFetch('/jobs/complete/' + jobId, 'post', new Headers(), undefined)
            .then((responseJson: JSON) => {

                return true;
            });
    }

    private addJobWithoutFile(): Promise<boolean> {

        return this.elasticOcrFetch('/jobs', 'post', new Headers(), undefined)
            .then((responseJson: JSON) => {

                return true;
            });
    }

    private addJobWithFile(file: File): Promise<boolean> {

        var headers: Headers = new Headers();
        headers.append('filename', file.name);
        headers.append('Content-Type', 'application/octet-stream');

        return this.elasticOcrFetch('/jobs', 'put', headers, file)
            .then((responseJson: JSON) => {

                return true;
            });
    }

    private elasticOcrFetch(endpointUrl: string, method: string, headers: Headers, body: any): Promise<any> {

        headers.append('licenseId', this.endpoint.LicenseId);
        headers.append('appId', this.endpoint.AppId);

        var url = this.endpoint.BaseUrl + endpointUrl;

        return fetch(url, {

            method: method,
            headers: headers,
            body: body
        })
            .then((response: Response) => {

                console.log(response);
                if (!response.ok) {

                    throw new Error(`${url} returned ${response.status}: ${response.statusText}`);
                }

                if (response.status === 204) {

                    return Promise.resolve({});
                }

                return response.json();
            })
            .catch((error: any) => {

                throw new Error(`Error fetching ${url}: ${error.toString()}`);
            });
    }
}