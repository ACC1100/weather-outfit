# About 
Picking out an outfit for the day can be a very involved process, often more than we would like it to be. Sweater Weather can make the process as simple as possible. The app picks out a small collection of outfits for you to choose from, taking into account the forecast weather for the day for your given location and the formality of the event you are attending. The combination of clothing is aimed to be as stylish as possible based on fundamental principles in fashion.

We were tired of trying to decide on an outfit every morning, taking care that it ticks all the necessary boxes and our project began as a simple idea to bring more time and peace of mind to everyone's mornings and nights before. Our team is a meeting of the fashion-hyperconscious and the fashion-insensitive, so we are confident that our project can be helpful to anyone along that spectrum.

##Project Structure
Though this kind of have service would undoubtedly have a lot of utility as a mobile app, our current prototype is a web app, consisting of a React front end and Python/Flask back end.

The React front end was built using "Create React App" for its simplicity and the "ChakraUI" component library. Create React App is mostly limited to single page applications, so that is what we stuck with, opting to rerender other 'pages' when needed. The styling and theme was done in an ad-hoc manner, incorporating many pastel colours and light colours. Our carousel was implemented using the the "React-Slick" package, which allowed us to display our outfits in an aesthetic and usable manner. Overall, we were quite happy with using React for the front end.

The Flask back end is where we handled the storage of clothes and generation of outfits. Our storage in the demo was done through local JSON files, but ideally this would be converted into a proper database in the future. Our weather data is provided by the Dark Sky API, allowing us to accurately determine the weather on a given day in a given location. The complicated outfit selector algorithm was also written in Python which took many, many hours to perfect especially considering how much was considered in picking the best outfit but we are very proud of the end result.

##Challenges
We all tried to go beyond our comfort zones in, tooling and process, to make the project the best we could. We probably spent half the weekend in the weeds of the Chakra UI docs and on Stack Overflow, but by the end, we had fully acclimatised.

This was our first time using the React + Flask stack, which proved to be very easy to learn. Flask was chosen for its simplicity, and we couldn't have chosen a better back end, as other competitiors like Django would be much harder to get set up and going, especially for those with little experience.

It was challenging to ensure proper project management and communication between all team members, especially online. We become much more proficient in negotiating requirements between the front end and back end with these requirements literally breaking our project if not done correctly. We remember fondly the time that one member added a single function call which broke the outfit generation procedure and prevented our server from running, immediately halting all other progress. Thankfully we fixed in the issue shortly, but it really emphasised the importance of good communication and well-tested code.

Additionally, our development strategy was mostly a "waterfall-method", which proved to be both sucessful and unsuccessful at the same time. It was successful given that we completed the task within the 48 hours, but it was unsuccessful in some 'shortcuts' we took during the development process. Towards the end, our code became more and more "spaghetti", and harder to work with.

##What we learned
Every member of our team learnt so much about the complete full stack development process and successfully connecting and utilising a front and back end. We made great use of JSON files, APIs and hosting through Heroku and expanded our knowledge of these tools through the project. We also learnt lots about improving the user experience as we continually improved the experience of using the website and making it as simple as possible. Originally we required users to input more data for each article of clothing but we learnt that it made using the website much more cumbersome and significantly minimised the amount of work each user had to do. In future, we will definitely plan more ahead of time and ensure some effective development processses to save headache in the final hours of our project.

We are very proud of creating our first full web app from scratch. We believe the user experience with our web app to be quite pleasing and we are proud of the algorithm that runs our outfit generator as it is able to account for so many different cases and nonetheless provide a variety of different excellent outfits.

Thank you for being interested in our fun 48 hour project. Take the outfits as is, or use it as a base to come up with looks that further express your self but we hope you have fun using our web app!