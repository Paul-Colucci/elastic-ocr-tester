export interface IJob {

    Id: string;
    Status: string;
    Filename: String;
    Created: Date;
    Available: Date;
    DownloadUrl: string;
    DownloadExpires: Date;
    Completed: Date;
    Message: String;
    ExceptionMessage: String;
}