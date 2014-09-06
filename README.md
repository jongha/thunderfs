## What is Thunderfs?

Thunderfs is web based service for the temporary file sharing . You can share files and can be uploaded for anyone without restriction. Files that have been shared will be deleted automatically after 10 minutes. You do not need to worry that the shared link of important files remain in the Internet.

### Technology stack

 - Server
	 - [Nginx](http://nginx.org/)
	 - [uwsgi](http://projects.unbit.it/uwsgi/) (for flask)
 - Front-end
	 - HTML5
	 - JavaScript ([Grunt](http://gruntjs.com/) build)
 - Back-end
	 - [Flask](http://flask.pocoo.org/) (Python)
	 - MongoDB (gridfs)

## Installing Thunderfs

### Operating system

Thunderfs should run on most Unix, Linux, Mac, Mac Server and Windows systems as long as Python and MongoDB are available on this platform.

## License

Thunderfs is available under the terms of the GNU-AGPL-3.0 License.is available under the terms of the GNU-AGPL-3.0 License.
