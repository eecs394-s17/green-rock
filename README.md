# DwayNU Johnson (Working Title)
DwayNU Johnson is an application for Northwestern students who want to promote a creative message but are too busy/lazy to reserve and paint The Rock.

## Setup ##
Make sure you have the right node version and npm version before you git clone the repo. Your node version should 'v7.3.0' and npm version should be '4.0.5'. 

To check your node version

    node -v

To check your npm version

    npm -v

### To change your node version to 'v7.3.0' from a different version (Linux) ###
- [Install Homebrew](https://brew.sh/)
- [Install NVM](http://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html) only do **Uninstall node via homebrew** and **Installing the Node Version Manager (nvm)**
- Then install the correct version of node.

    

    nvm install 7.3.0

### To change your node version to '4.5.0' from a different version (Linux) ###

    npm install npm@4.5.0 -g


### Cloning the repo ###
To get the repo on your computer go into the folder you want the app to be in on you computer.

	git clone https://github.com/eecs394-s17/green-rock.git
	cd green-rock
	npm install

This make sure you have the lastest versions of all the packages in the branch

### Pulling from `stable`? ###
If you run into issues deploying, try the following:
1. Run `npm install`.
2. Make sure the Ionic Native Camera plugin is installed by running `ionic plugin add cordova-plugin-camera`.
3. Do the same for the Ionic Native Screenshot plugin: `ionic plugin add https://github.com/gitawego/cordova-screenshot.git`
4. Ionic Native Toast plugin should also be installed: `ionic plugin add cordova-plugin-x-toast`

## Git Basics for this Repo ##
Click here for a [quick overview of Git](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics).

### Overview of our Git Setup ###
Read [this article](http://nvie.com/posts/a-successful-git-branching-model/) to understand the branching structure we are using for our project. Here is the last of the following branches we will have: 
- 'master' – this is our production branch which will be showed to users
- 'stable' – this is our branch that should theoretically be bug free (similar to develop branch from the article)
- '&lt;feature name&gt;' – this is a branch where you work on a particular feature. This should be a branch off of stable and then be merged back into stable.

You should really only be working on stable and feature branches. Together as a team we will usually push to master - just to make sure everything is ok.

### Starting commiting in Git ###
Suppose you want to make a small change to code in the stable branch. So the first 
step is to checkout the stable branch (or another branch - just replace stable in the below commands).

	git checkout stable

Then pull the stable branch from origin just in case to get the latest code.

	git pull origin stable

Make your change and then go onto check your change.

	git status //This will check which files you modified. Make sure these are the right ones.
	git diff //This will show you the changes you made to files that are already version controlled.

If your changes look good then make sure to pull and then commit your code. Make sure to tell people when you are pushing onto stable please.

	git pull origin stable
	git add --all //this adds all files. you can do git add <filename> for individual files
	git commit -m "Your message here." //commits your code

Now check the status of your branch. It should say you are one commit ahead of origin/stable.

	git status

This is because you have not pushed to origin. Go ahead and push to origin.

	git push origin stable

### Merging ###
Read this quick [Stack Overflow on merging](http://stackoverflow.com/questions/9069061/what-is-the-difference-between-git-merge-and-git-merge-no-ff). Make sure to read the 'Graphical answer to this question' as well. 

So when we merge we want to save the history in our network graph. For example if we want to merge the 'background-image' branch into 'stable' then do the following.

	git pull //make sure you have the latest code and you have commited your code.
	git checkout stable //check out the branch you are merging into
	git merge --no-ff background-image //The --no-ff is really important for merging don't forget it.

Now vi should open. Just type ':q' and hit 'Enter'. This should close the window. Now push your merge to origin.

	git push origin stable

If you have any questions about Git stuff ask Sameer.




