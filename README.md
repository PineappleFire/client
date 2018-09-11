# client
The front-end code for the web interface

*Terminology*

A *pack* is any number of icons that are sold together. It can be as little as 1 icon and has no upper limit.

## Pages
### Icons
#### API
```javascript
{
	unitPrice: number,
	priceScale: number,
	page: number,
	next: url,
	previous: url,
	packs: [
    	{
    		id: string (or number),
    		img: url,
    		title: string,
    		packNumber: number,
    		votes: number,
    		cart: boolean,
    		author: string
    	}
    ]
  }
```
##### Key
*unitPrice*: The price of a single icon  
*priceScale*: The value that determines how much of a discount is applied for larger pack numbers  
*page*: The paginated index  
*next*: A url to query the next page  
*previous*: A url to query the previous page 
*id*: The unique id for the pack  
*img*: The url that points to where the icon png is posted   
*title*: The title of the application or purpose for which the icon is designed  
*packNumber*: The number of icons in the pack  
*cart*: Whether the pack is in the users cart or not  
*votes*: The number of cumulative upvotes and downvotes that the pack has received
*author*: Who made the icon  