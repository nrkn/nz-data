#NZ data visualisation thing

I think it would be interesting to make an open source web app for visualising NZ statistical data, particularly election and polling data.

Probably with [d3](http://d3js.org/)

Any ideas, contributions, corrections etc. welcomed. 

##Plan

A visualisation of a horizontally panning timeline divided into months, starting with the first MMP election in 1996: 

1. If it was the month the election was held in, the result of the general election in a data box with various stats.
2. If not, poll data for that month where available, otherwise interpolated between the last available poll or election result and the next available. 

![](timeline.png)

I don't have a plan. I'm just going to pick away at it when I have time. 

##Currently contains

All I have so far is the 'minimum possible to be useful' election data in .json format for the first four MMP elections: 1996, 1999, 2002, 2005; and some tools to concatenate those into a single .json file or convert them to .csv

##It would be really nice to get pull requests with:

- More years, if I'm working on one I'll commit it as an empty file before starting so you know not to bother.
- Candidate and electorate seat data for each year
- Census data (so you can compare how many people 18+ and how many people enrolled etc.)
- Opinion poll results 

If you want to add some election result data, you can get it from Wikipedia:
- [1996](http://en.wikipedia.org/wiki/New_Zealand_general_election,_1996) (done)
- [1999](http://en.wikipedia.org/wiki/New_Zealand_general_election,_1999) (done)
- [2002](http://en.wikipedia.org/wiki/New_Zealand_general_election,_2002) (done)
- [2005](http://en.wikipedia.org/wiki/New_Zealand_general_election,_2005) (done)
- [2008](http://en.wikipedia.org/wiki/New_Zealand_general_election,_2008)
- [2011](http://en.wikipedia.org/wiki/New_Zealand_general_election,_2011)

##Example:

```javascript
{
  "1996": {    
    "date": "12/10/1996",
    "parliamentNumber": 45,
    "wikiSlug": "New_Zealand_general_election,_1996",
    "registered": 2418587,
    "results": {
      "National": {
        "partyVote": 701315,
        "electorateSeats": 30,
        "listSeats": 14
      },
      "Labour": {
        "partyVote": 584159,
        "electorateSeats": 26,
        "listSeats": 11
      },
      ...
    },
    "informal": 8183,
    "disallowedSpecial": 54633
  }
}
```

##License
The MIT License (MIT)

Copyright (c) 2014 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
