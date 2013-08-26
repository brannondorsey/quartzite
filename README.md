#Quartzite

Quartzite is a Google Chrome browser extension that allows users to autolog screenshots and metadata when surfing the web. When Quartzite is enabled it saves a screenshot to your server whenever you go to a new page. It also saves information about each visit like the domain, url, and the length visited. Installing Quartzite on your server is easy, just download this repository and follow the instructions below.

##Setup
This repository is split into three folders:

- server
- extension
- example

It is important to recognize this seperation because the Quartzite extension only works when it can properly connect to a users server. It is for this reason that the installation is broken into two steps: server setup and then extension setup.

###Server setup
Dynamic web hosting with enabled PHP and MySQL is needed for Quartzite to work. If you do not already have your own domain hosting I recommend a basic hosting plan through [Bluehost](http://bluehost.com) or [Godaddy](http://godaddy.com).

When you open the "server" directory you should see the following files:

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/server_folder.png)

__blocked_domains.txt__ is a list of the domain names for sites that Quartzite doesn't have access to. For security reasons you may want to ban sites like "facebook.com" or "paypal.com" so that Quartzite wount log your private data. Remember that unless you setup your own password protected pages on your server the [API data](#api) and screenshots will be public and anyone can access them..

__database_import.sql__ is an sql file that contains the pre-structured _quartzite_ database as well as the _metadata_ table. Use it to import the the Quartzite database onto your server using PhpMyAdmin.

The __history__ directory houses the screenshots saved by Quartzite. Inside you will find a folder named _images_. This is where the .png screenshots are located.

The __src__ directory holds the important php files and webpages that handle the connection between the Quartzite extension and your server. This is where you will edit the files as described below. 

####Create the database on your server

Firstly, you need to create a dedicated Quartzite database on your server. If this is the first time you have created a new MySQL database on your server or you need a refresher check out your DNS hosting company's tutorials. 

I recommend creating a new database using MySQL Database Wizard. This helper app should already be installed on your server. Using Bluehost it is located in the Database Tools section of the cPanel. Open MySQL Database Wizard now.

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/database_wizard_1.png)

You should see a page similar to the one above. You will be prompted to create a new database using your user as a prefix. Prepend it with the desired name of your Quartzite database. I recommend using "quartzite". Be sure to remember the name of your database as you will need it later in this setup.

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/database_wizard_2.png)

Next create a user for the database (or add a user if the one you want to use already exists). Remember the username and password for this step as well.  

####Edit the files

Next open the `class.Database.inc.php` file inside the `src/includes` directory.
Inside you will find the `$root_dir_link`, `$key`, `$user`, `$password`, and `$db` variables. 

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/database_class_screenshot.png)

The `$root_dir_link` value should be changed to the full url of the directory (including the name) of the folder where you plan on putting your Quartzite server folder. The `$key` is a unique 5 digit passcode. Changing this value to a unique key prohibits other users from submitting images or data to your server. When [setting up the extension](#extension-setup) you will use the same key that you provide here to authorize your extension permission to communicate with your server. 

Replace the `$user`, `$password`, and `$db` values with the username, password, and database name that you created with MySQL Database Wizard. Edit these variables now.

Next open the `database_import.sql` file inside the `server` folder.

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/database_import_screenshot.png)

Change all instances of `your_database_name` (lines 20, 22, and 23) to the name of the database you just created using MySQL Database Wizard.
 
####Import the database

Loggin to PhpMyAdmin on your server and click the "Import" tab on the top navigation bar. Select the "Choose File" button and open the `server/database_import.sql` file. Make sure that the "Character set of the file" is set to "utf-8" (this should already be the default value). Press "Go" to import the database.

####Upload the files to the server

Now that you have edited the files and installed the database you are ready to upload the files to your server. FTP into your server now and create a new folder inside of your `public_html` (or equivalent) directory. Name this folder whatever you specified in the `$root_dir_link` variable inside the `class.Database.inc.php` file. For instance, if `$root_dir_link = "http://brannondorsey.com/quartzite"` you would name the new folder "quartzite". Now drag the __entire "server" folder__ (not its contents) inside the directory you just made.

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/file_structure_on_server.png)

The above image is a an example of how the file structure should look once uploaded to the server. 

The screenshot shows my server at http://brannondorsey.com/hidden. 
For clearity the files `server/src/includes/class.Database.inc.php` and `extension/scripts/content_script.js` in this setup read  `$root_dir_link = "http://brannondorsey.com/hidden/quartzite"` and `var rootDirLink = "http://brannondorsey.com/hidden/quartzite"` respectively.

Thats it! Time to setup the extension...

###Extension setup

You are now ready to setup and install the Quartzite browser extension on Google Chrome. 

####Edit one more file

Before installing the Quartzite extension on Google Chrome you must personalize the "content_script.js" file located at this repository's `extension/scripts/content_script.js` path. Open that file now.

![Screenshot](http://brannondorsey.com/hidden/github_images/quartzite/content_script_screenshot.png)

Change these two variables to reflect the [changes you made](#edit-the-files) to the `server/src/indludes/class.Database.inc.php` file earlier.

This points your Quartzite extension to the server files you just set up and allows your chrome extension access to post/retrieve data from those server files.

####Load and pack the extension

Open Google Chrome and open the Extensions page by navigating to Window -> Extensions. Click the "Load unpacked extension" button and select the extension folder (COME BACK is this the contents or the folder itself?). The loaded extension should be automatically enabled. If it isn't check the "enabled" box.

The Quartzite extension should now be sending screenshots and metadata to your browser. If it isn't or you are having another problem with the setup checkout the [Troubleshooting section](#troubleshooting) of this reference.

Enjoy!

##Example

##API

##Troubleshooting

Permissions on server are correct?