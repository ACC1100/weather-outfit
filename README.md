# Sweater Weather by DLCT
Aaron Chao, Allan Chan, Damien Ambegoda, Isuru Peiris, Zhijie Cao

## About
Picking out an outfit for the day can be a very involved process, often more than we would like it to be. Sweater Weather can make the process as simple as possible. The app picks out a small collection of outfits for you to choose from, taking into account the forecast weather for the day for your given location and the formality of the event you are attending. The combination of clothing is aimed to be as stylish as possible based on fundamental principles in fashion.

We were tired of trying to decide on an outfit every morning, taking care that it ticks all the necessary boxes and our project began as a simple idea to bring more time and peace of mind to everyone's mornings and nights before. Our team is a meeting of the fashion-hyperconscious and the fashion-insensitive, so we are confident that our project can be helpful to anyone along that spectrum.

## Project Structure
Though this kind of have service would undoubtedly have a lot of utility as a mobile app, our current prototype is a web app, consisting of a React front end and Python back end.

(add front end info)

The back end is where we handled the storage of clothes and generation of outfits. Our weather data is provided by the Dark Sky API, allowing us to accurately determine the weather on a given day in a given location. The complicated outfit selector algorithm was also written in Python which took many, many hours to perfect especially considering how much was considered in picking the best outfit but we are very proud of the end result.

## Challenges
We all tried to go beyond our comfort zones in, tooling and process, to make the project the best we could. We probably spent half the weekend in the weeds of the Chakra UI docs and on Stack Overflow, but by the end, we had fully acclimatised.

It was challenging to ensure proper project management and communication between all team members, especially online. We become much more proficient in negotiating requirements between the front end and back end with these requirements literally breaking our project if not done correctly. We remember fondly the time that one member added a single function call which broke the outfit generation procedure and prevented our server from running, immediately halting all other progress. Thankfully we fixed in the issue shortly, but it really emphasised the importance of good communication and well-tested code.

## What we learned
Every member of our team learnt so much about the complete full stack development process and successfully connecting and utilising a front and back end. We made great use of JSON files, APIs and hosting through Heroku and expanded our knowledge of these tools through the project. We also learnt lots about improving the user experience as we continually improved the experience of using the website and making it as simple as possible. Originally we required users to input more data for each article of clothing but we learnt that it made using the website much more cumbersome and significantly minimised the amount of work each user had to do.

We are very proud of creating our first full web app from scratch. We believe the user experience with our web app to be quite pleasing and we are proud of the algorithm that runs our outfit generator as it is able to account for so many different cases and nonetheless provide a variety of different excellent outfits.

Thank you for being interested in our fun 48 hour project. Take the outfits as is, or use it as a base to come up with looks that further express your self but we hope you have fun using our web app!