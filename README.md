# **SCRUMptious**

**Git Repo for team Scrumptious in CS 361 at Oregon State University!**

## Github Protocol

### How to update your local repo to include main changes

    git pull origin main //pulls main branch up to date on your system
    git merge main //merges changes from the updated main branch to your current branch
    git fetch //pulls updates on your branch incase there have been changes

### How to handle making changes

    If you are requesting changes on a request, be sure to add what you thinks to be changed or fixed
    If changes are approved and merged onto the main branch, ensure the old branch is **DELETED** and **NOT COMMITTED TO EVER AGAIN!** This is to ensure the cleanliness of the repo

### What to do after you merge your new branch
    git checkout main //changes your working branch to main
    git pull origin main //pulls main to ensure you have the most recent version
    git reset --hard //clears old branches

Note: This will completely remove any old branches you've had on your system!

You can request specific people to view your Pull Request, which is recommended if you make changes to something that someone else has worked on previously.
