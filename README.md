Installation:
1) Install node.js
2) npm install
3) install nginx
4) in folder <nginx-home>/conf replace the conf file with one from etc
5) edit this file. In root location (location with url /) edit the location of deploy folder. Specify any you like.
6) npm run build
7) copy the contents of the build folder to the deploy folder, created in 5)
you are done, run nginx
