Configure proxy settings
========================

	NPM
	---
		Configure NPM proxy, run commands in command prompt:
	
			npm config set http-proxy "http://proxy.eib.company.be:8080"
			npm config set https-proxy "http://proxy.eib.company.be:8080"

	Bower
	-----
		Configure bower proxy:  add following proxy settings to "C:\Users\<MyWindowsAccount>\.bowerrc" file

			{
			  "proxy":"http://proxy.eib.company.be:8080",
			  "https-proxy":"http://proxy.eib.company.be:8080"
			}

	Git
	---
		Add HOME environment variable to the USER settings

			HOME = c:\users\<MyWindowsAccount>

		Configure git proxy, run commands in command prompt:    
		
			git config --global http.proxy http://proxy.eib.company.be:8080
			git config --global https.proxy http://proxy.eib.company.be:8080

	    Configure git to only use https:// scheme instead of git:// 

	       git config --global url."https://".insteadOf git://

Run unit tests
==============

test and code coverage command:   karma start karma.conf.js --single-run --browsers PhantomJS

debug karma command:              karma start --log-level=DEBUG
                                