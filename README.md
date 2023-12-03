# **SCRUMptious**

**Git Repo for team Scrumptious in CS 361 at Oregon State University!**

## Github Protocol

### How to update your local repo to include main changes

    git pull origin main //pulls main branch up to date on your system
    git merge main //merges changes from the updated main branch into your current branch
    git fetch //pulls updates on your branch incase there have been changes

### How to handle making changes

- Make a new [branch](https://github.com/Rossback/SCRUMptious/branches) with a name that tells others what is being changed
- If you are making changes on multiple things or features, list them in your Pull Request
- Try to use one branch for one topic/feature/change
- Add comments so others can understand what your code does

### How to make Pull Requests

1. Create a new branch and push your changes to it, the branch protocols are listed [above](https://github.com/Rossback/SCRUMptious/tree/readme-update#how-to-handle-making-changes)
2. Create a [Pull Request](https://github.com/Rossback/SCRUMptious/pulls) with a description that says everything you changed, especially if your branch name does not describe all your changes
3. Message other people about your Pull Request so others can approve, comment on, or request changes to your request[^1]
    - If you are approving a Pull Request, be sure to merge and delete the branch with the request
    - If you are commenting on a request, be sure to add something meaningful
    - If you are requesting changes on a request, be sure to add what you think needs to be changed or fixed
4. If changes are approved and merged onto the main branch, ensure the old branch is **DELETED** and **NOT COMMITED TO EVER AGAIN!** This is to ensure the cleanliness of the repo :+1:

### What to do after you merge your new branch

    git checkout main //changes your working branch to main
    git pull origin main //pulls main to ensure you have the most recent version
    git reset --hard //clears old branches

Note: This will completely remove any old branches you've had on your system!

[^1]: You can request specific people to review your Pull Request, which is recommended if you make changes to something that someone else has worked on previously
