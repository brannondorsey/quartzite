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

(COME BACK and add a screenshot hosted on my domain)

__blocked_domains.txt__ is a list of the domain names for sites that Quartzite doesn't have access to. For security reasons you may want to ban sites like "facebook.com" or "paypal.com" so that Quartzite wount log your private data. Remember that unless you setup your own password requirement on your own server the [API data](COME BACK) and screenshots will be public and anyone can access them..

__database_import.sql__ is an sql file that contains the pre-structured _quartzite_ database as well as the _metadata_ table. Use it to import the the Quartzite database onto your server using PhpMyAdmin.

The __history__ directory houses the screenshots saved by Quartzite. Inside you will find a folder named _images_. This is where the .png screenshots are located.

The __src__ directory holds the important php files and webpages that handle the connection between the Quartzite extension and your server. This is where you will edit the files as described below. 

####Edit the files

Firstly, open the `class.Database.inc.php` file inside the `src/includes` directory.
Inside you will find the `$root_dir_link` and `$key` variables. The `$root_dir_link` value should be the full url of the directory where you plan on putting your Quartzite server folder. The `$key` is a unique 5 digit passcode. Changing this value to a unique key prohibits other users from submitting images or data to your server. When seting up the [extension](COME BACK) you will use the same key that you provide here to authorize your extension permission to communicate with your server. Edit these variables now.

####Install the database

Loggin to PhpMyAdmin on your server and click the "Import" tab on the top navigation bar. Select the "Choose File" button and open the `server/database_import.sql` file. Make sure that the "Character set of the file" is set to "utf-8" (this should already be the default value). Press "Go" to import the database.

####Upload the files to the server

Now that you have edited the files and installed the database you are ready to upload the files to your server. FTP into your server now and create a new folder inside of your `public_html` (or equivalent) directory. Name this folder whatever you specified in the `$root_dir_link` variable inside the `class.Database.inc.php` file. For instance, if `$root_dir_link = "http://brannondorsey.com/quartzite"` I would name the new folder "quartzite". Now drag the entire "server" folder inside the directory you just made.

COME BACK set permissions recursively

Thats it! You are now ready to setup and install the Quartzite browser extension. 

###Extension setup
 

##API

##Troubleshooting