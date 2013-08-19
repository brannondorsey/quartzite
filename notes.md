#Quartzite Notes

##Ideas

- Create a website that displays my online web activity (i.e. brannononline.com). Visitors will be able to view screenshots of the webpages that I have most recently visited (with live updates), categorize and filter results using metadata, and search for specific sites or content. Data analysis will also be included so that viewer's can see where I most spend my time on the web etc…

- Create an image that visually blends the 1000 most recent webpages that I have visited. This could yield an interesting insight into the most common layouts and styles on the web.

- Use the extension to search pages for words on the [NSA Blacklist](http://www.businessinsider.com/nsa-prism-keywords-for-domestic-spying-2013-6) and then auto send an email to the nsa admitting you went to the site and volunteering the information that was found. The email will include a screenshot and a message like "I recognize that this behavior is less than patriotic and I wanted to personally apologize for leading you on".

- Make whatever I decide to do allow users so that other people can do the same thing.

##Todo

- Better error handleing
- Handle database having no entries

##Completed

- Use MySQL Database instead of sidecart `json` files.
- Make a unique key required to upload image to server (sent through `$_POST`)
- Clean up code
- Add `blocked_domains.txt` page so that domains can be blacklisted. Use same newline style as .gitignore.
- Make content_script save the length of time a page has been open in the metadata
- Build API to access data
- Handle refreshes so that they don't take another screenshot and add a new metadata entry to the database
