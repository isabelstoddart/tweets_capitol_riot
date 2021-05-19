# Tweets from 2:10 - 2:15 PM on January 6th, 2021 sized by number of followers of Tweeter
## The first 5 minutes after the capitol rioters entered the capitol building

Warning: Some tweets included use foul language

### Process
* Started by looking through the data. Had issues using the AWS CLI and jq package so decided to just download the files and use one of them
* After doing some research, narrowed down the files to the one from January 6th at 2:10 - 2:15 PM because this is around the first 5 minutes after the rioters entered the capitol building
* Changed newline-deliminated json to regular json so the file could be fed into d3.js
* Decided to look at tweets by top users by comparing tweets by the number of followers of the tweeter

### Findings

I was interested to see that the tweets from users with the most followers at this time weren't all about the riots. There are a lot of tweets in general about the riots and the Georgia elections, but a lot of the ones from top users are click bait type tweets. This was a very interesting finding for me. It would be interesting to see what the different tweets look like if the click bait tweets were filtered out.

### Possible Next Steps

* Filter out the click bait tweets to see what distribution of tweets looks like without them
* Color the tweets by hashtag or key word to easier see which ones are related to the riots/politics and which ones are not (could also filter tweets by republican/democrat leaning)
* Expand this visual to include more data (look at the full time the rioters were in the capitol building)
