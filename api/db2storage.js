const { BlobServiceClient, StorageSharedKeyCredential  } = require('@azure/storage-blob');


const db2storage = {
    save: async function(namespace, locale, doc) {
        // const connection = db.getConnection();
        // const packages = connection.collection('packages');
        // const resource = await packages.findOne({namespace: namespace, locale: locale});

        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
        if (!accountName) throw Error('Azure Storage accountName not found');
        if (!accountKey) throw Error('Azure Storage accountKey not found');
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        
        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net`,
          sharedKeyCredential
        );
        
        const containerName = 'polear';
        const blobName = `${locale}/${namespace}.json`;

        const containerClient = await blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const jsonDoc = JSON.stringify(doc);
        await blockBlobClient.upload(jsonDoc, jsonDoc.length);        
    },
}

module.exports = db2storage;