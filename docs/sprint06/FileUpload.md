# File Upload

When dealing with file uploads in a web application, it's important to understand both the client-side and server-side processes. Below is a detailed explanation of how files are sent to the API and stored on the server, along with the data storage mechanisms involved.

There are a few ways of storing files in a web application, such as storing them in a database, storing them in a file system, or storing them in a cloud storage service like Amazon S3 or Google Cloud Storage.

In this lesson, we will focus on storing files in a file system, as it is the most common approach for small to medium-sized applications.

## Process of sending files to the API and storing them in disk storage

### Client-side process (example with React)

Web applications can receive various types of input from users. From text fields, checkboxes, images, videos, etc...
Usually, these forms are submitted to the server in various ways, including the structure of a JSON as discussed up to the current lesson.
However, when submitting files to the server, this type of structure is not appropriate since files are not alphanumeric.

As such, the multipart/form-data content type is used, which allows the processing of binary data (such as images).

#### Create an HTML form with a file input field (example with react and an express API)

The first step in uploading a file is to create an HTML form that includes a file input field. This field allows the user to select a file from their local machine.

```jsx
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    // any additional data can be appended to the form data
    // formData.append('name', 'desired_file_name');

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
```

### Server side process (example with express)

On the server side, the file is received as a binary stream and stored in a temporary location. The server then needs to process the file and saves it to a permanent location.

Currently, our API's are only able to receive JSON data as we only integrated the JSON middleware. To handle file uploads, we need to use a middleware that can handle multipart/form-data.

Multer is a popular middleware for handling file uploads in Node.js. It allows you to upload files to the server and provides various options for file handling, such as renaming files, setting file size limits, and filtering file types.


#### Install Multer

To use Multer in your Express application, you need to install it using npm or yarn.
Additionally, you can install the `uuid` package to generate unique filenames for the uploaded files.

```bash
npm install multer uuid
```

#### Configure Multer

After installing Multer, you need to configure it in your Express application. You can set the destination and filename for the uploaded files, as well as other options.

Usually the filenames should be unique to avoid conflicts when multiple users upload files with the same name. You can use the `uuid` package to generate unique filenames.
Adittionally, by having random filenames, you can avoid some security issues like path traversal attacks.

For the folder where the files will be stored, you can use the `path` module to create a path relative to the root of the project. This way, you can ensure that the files are stored in a secure location.

```javascript

const express = require('express');
const multer = require('multer');
const uuid = require('uuidv4');

const app = express();

// Step 1: defining 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuid();
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Step 2: defining the route ()
app.post('/upload-avatar', upload.single('file'), (req, res) => {
    // access the stored file path to store it in the database
    const filePath = req.file.path;
    // any additional data can be accessed from the request body
    const { name } = req.body;

    const { user } = req;
    
    // example with a user avatar
    await jane.update({ avatar: filePath });

    await jane.save();
    
    res.json({ message: 'File uploaded successfully' });
});


// Step 3: exposing the static folder
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

```

In the example above, we defined a storage configuration for Multer that specifies the destination folder and filename for the uploaded files. The `upload.single('file')` middleware is used to handle a single file upload with the field name 'file'.

After the file is uploaded, the server responds with a JSON message indicating that the file was uploaded successfully.

### Using the image on the client side

After the file is uploaded to the server, you can access it using the URL provided by the server. In the example above, we exposed the `/uploads` folder as a static directory, so the uploaded files can be accessed directly from the client side.

As the base url of the API changes from development to production, it is recommended to store the base url in an environment variable.

```javascript
const storageBaseUrl = process.env.STORAGE_BASE_URL || 'http://localhost:3000';

const imageUrl = `${storageBaseUrl}/uploads/${fileName}`;
```

By using the `storageBaseUrl` variable, you can ensure that the image URLs are generated correctly in different environments.

## Using a CDN to serve static files

When serving static files like images, videos, or documents, it's common to use a Content Delivery Network (CDN) to improve performance and reduce latency.

A CDN is a network of servers distributed across different locations that cache static content and deliver it to users based on their geographic location. This helps reduce the load on the origin server and improves the speed at which content is delivered to users.

Popular CDN providers include Cloudflare, Akamai, Amazon CloudFront, and Google Cloud CDN.

To use a CDN with your web application, you need to configure the CDN to cache your static files and set up the appropriate DNS records to point to the CDN's servers.

As the responses from the CDN are cached in a distributed network of servers, the content is delivered faster to users, resulting in a better user experience. It also reduces the load on the origin server, making it more scalable and reliable.


## Conclusion

In this lesson, we covered the process of uploading files from a client-side application to a server-side API and storing them in a file system. We used Multer as a middleware to handle file uploads in an Express application and generated unique filenames using the `uuid` package.

By following the steps outlined in this lesson, you can implement file uploads in your web application and serve static files using a CDN to improve performance and reduce latency.