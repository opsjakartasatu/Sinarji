import { Client } from "minio";

const minioClientIT = new Client({
    endPoint: process.env.MINIO_ENDPOINT_IT,
    port: process.env.MINIO_PORT_IT,
    useSSL: process.env.MINIO_USESSL_IT === "true",
    accessKey: process.env.MINIO_ACCESSKEY_IT,
    secretKey: process.env.MINIO_SECRETKEY_IT,
});
const bucketNameIT = "itjakartasatu";
const parentFolderIT = "jsf";

const minioClientRTLH = new Client({
    endPoint: process.env.MINIO_ENDPOINT_RTLH,
    port: process.env.MINIO_PORT_RTLH,
    useSSL: process.env.MINIO_USESSL_RTLH === "true",
    accessKey: process.env.MINIO_ACCESSKEY_RTLH,
    secretKey: process.env.MINIO_SECRETKEY_RTLH,
});

const bucketNameRTLH = "data-rtlh";
const parentFolderRTLH = "FileAttachments";


export {
    minioClientIT,
    bucketNameIT,
    parentFolderIT,
    minioClientRTLH,
    bucketNameRTLH,
    parentFolderRTLH
}