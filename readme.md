#NZ data in .json format

Currently minimal election data from the first two MMP elections, 1996 and 1999

##Would be nice to get pull requests for:
Candidate and electorate seat data, more years, census results, opinion poll results etc. 

##Example:

```javascript
{
  1996: {    
    date: '12/10/1996',
    parliamentNumber: 45,
    wikiSlug: 'New_Zealand_general_election,_1996',
    registered: 2418587,
    results: {
      'National': {
        party: 701315,
        electorates: 30,
        list: 14
      },
      'Labour': {
        party: 584159,
        electorates: 26,
        list: 11
      },
      ...
    },
    informal: 8183,
    disallowedSpecial: 54633
  }
}
```