#Google Maps Test Project

[![Code Climate](https://codeclimate.com/github/nickbdyer/gmaps-practice/badges/gpa.svg)](https://codeclimate.com/github/nickbdyer/gmaps-practice)

This repo was used as a basis for making some sturcutred pivots on our final
project idea. 

Using code presented by [Google](https://developers.google.com/maps/).

###Lessons Learned

- Google Fusion tables exist, and are very good for testing your data set.
  However, we discovered that the 1000 point limit on the heatmap was
  a restriction we could not allow. 
- Using a Node readStream is an extremely efficient way of reading data. This
  technique felt very much like we were using Node for a good reason. 
- The amount of data required to create any sort of reliable correlation on
  a map scale was larger than anticipated, but mapping that amount of data was
  going to be slow. 
- Caching data sets was going to be a requirement for the main project if we
  had any hope of getting the app to scale.
- Storing the data in a txt file was fine, but reading it back was not quite as
  fast as reading back from MongoDB. 
