// I will implement a linked list with custom methods .

// Linked lists are used mostly when we want to make a lot of insertions 
// A linked list, compared to an array will have O(1) insertion time 
// An array will  have an insertion time complexity in the middle of O(n) (compared to a linked list O(1))
// Because every element in the array must be shifted in order to make room for the new element.
// This is not the case of the linked list, we only need to change prev and current pointers.



class Node{

	constructor(data,next){

		this.data=data
		this.next=next || null
	
	}

}


class MyLinkedList{

	#size
	#lastNode
	#lastPlaced
	#head
	constructor(){

		this.#head=null
		// initializing the head of the linked list , this is where is all starting.

		this.#size=0;
		// this will count the size of the linked list .

		this.#lastNode=this.#head


		this.#lastPlaced=false

	}


	InsertElementFirstIndex(data){

		
		// i will keep track of the last node element, so i won't count each time InsertElementLastIndex() is called

		

		this.#head=new Node(data,this.#head)
		//add a node at the at the first index ( the previous first will become second now)

		if (this.#lastPlaced===false) {
			// if I keep inserting at the first index, then the last element will be always the same, so i need only once to store the last element.

			this.#lastNode=this.#head
			this.#lastPlaced=true;
		}
		
		
		this.#size++
		//increment the size of the linked list so i won't count each time the returnSize() will be called

	}
	InsertElementLastIndex(data){

		// this function will insert AFTER the last index.

		if (!this.#head) {
			
			this.#head=new Node(data)
			this.#size++
			this.#lastNode=this.#head
			return

		}

		

		var node=new Node(data)
		// i will create a node with the data, but next will be null because this will be the last node.


		this.#lastNode.next=node

		// setting the lastnode's next i kept count of to this new node, which will be the last one

		this.#lastNode=node

		// setting the lastnode to the node i created in this function
		this.#size++

	}
	
	InsertElementAtSpecificIndex(index,data){

		//basic checks for errors...
		
		var res=this.#helperFunction(index)

		if (res===false) {
			
		
			return
		}

		

		//if everything is ok , this is the inserting implementation.

		if (index===0) {
			
			this.InsertElementFirstIndex(data)
			return
		}
		

		var i=1;
		var prev=this.#head
		var curr=this.#head.next

		while (curr) {
			
			if (i===index) {
				
				prev.next=new Node(data,curr)
				break

			}

			prev=curr
			curr=curr.next

			i++
		}

		this.#size++

	}

	RemoveElementAtSpecificIndex(index){

		var res=this.#helperFunction(index)

		if (res===false) {
			
			console.log('Check the index passed, it is wrong.');
			return
		}

		if (index===0) {
			
			this.#head=this.#head.next
			return;

		}
	

		var prev=this.#head
		var current=this.#head.next
		
		

		var i=1;

		while (current) {
			

			if (i===index) {
				

				if (current.next!=null) {
					
					prev.next=current.next
				}
				else{
					prev.next=null
				}

				
				break

			}


			prev=current
			current=current.next

			i++

		}
		this.#size--

	}

	GetAtIndex(index){

		//unfortunately this will be O(n)
		//this function will search O(n) for the index-th element

		var res=this.#helperFunction(index)

		if (res===false) {
			
			return 
		}

		var i=0;
		var hd=this.#head

		while (hd) {
			
			if (i===index) {
				
				return hd.data
			}

			hd=hd.next
			i++
		

		}


	}

	AppendLinkedList(otherHead){
		//this function will append  this linked list to other linked list
		if (typeof otherHead!='object') {
			
			console.log(`You need to insert a linked list. TypeOf you inserted is ${typeof otherHead}`);
			return false;
		}



		// next i will check the size of the parameter so i can add the corresponding size to the this.#size, and check if it's a valid linked list

		var check=otherHead

	   var lnksize=0;
		while (check) {
			
			
			if (check.hasOwnProperty('data')===false || check.hasOwnProperty('next')===false) {
				
				console.log('Appended linked list does not have a valid format, missing data or next key');
				return false
			}


			lnksize++
			check=check.next
		}


		      //below is the command which actually link toghether 2 linked lists.
			this.#lastNode.next=otherHead
			
			//then i increase the current size with the new linked size.
			this.#size+=lnksize

			//now i need to update the lastnode property
			var otherHeadClone=otherHead

			while (otherHeadClone) {
				
				if (otherHeadClone.next===null) {
					
					this.#lastNode=otherHead
					break
				}
				otherHeadClone=otherHeadClone.next
			}

	}

	RemoveDuplicates(){

		// this function removes all duplicates from the linked list

		
	if(head===null){
		return null
	  }
	
	  
	  var prev=head
	  var curr=head.next

	  var obj={}
	  obj[prev.data.toString()]=1
	  // hashmap for detecting if we have duplicates or not


	  
	  while(curr){
		
		
		
		if(obj[curr.data.toString()]===undefined ){
		  
		  obj[curr.data.toString()]=1
		}
		else{
		  
		  
		  prev.next=curr.next
		
		  this.#size--
		  curr=prev.next
		  continue
		
		
		}
		
	
		prev=curr
		curr=curr.next
		
	
	  }
	  return head
	}

	ReverseLinkedList(){

		//the classic interview question, reversing a linked list .

		var hd
		var prev=null
		var current=this.#head
		

		while (current) {
			

			
			var save = current.next

			current.next=prev

			prev=current

			current=save;

			if (save) {
				hd=save
			}
			else break
			

		}

		// im assigning hd to head because head is still pointing to the first node  example reversed ( 5 4 3 2 1:null)
		this.#head=hd
		return hd



	}

	NodeMania(k){

		// just some interview question 
		

		/* given the following linked list: a -> b -> c -> d

               if k = 1 then d should be returned
               if k = 2 then c should be returned
               if k = 3 then b should be returned
               if k = 4 then a should be returned


			   
 */

			   
  var head=this.#head
  
  var i=1;
  
  while(head.next){
    
    head=head.next
    i++
  }
  
  
  var head=this.#head
  
  while (head){
    
    if(k===i){
      
      return head.data
    }
    
    head=head.next
    i--
    
    
    
    
  }

   console.log('Could not find matching element');
   return false;
		
	}

	AppendArrayToEnd(arr){

		if (typeof arr!='object') {
			
			console.log('Parameters are wrong type.');
			return 
		}

		var i=0;

		while (i<arr.length) {


			this.InsertElementLastIndex(arr[i])

			i++

		}

		



	}

	AppendArrayToBeginning(arr){

		if (typeof arr!='object') {
			
			console.log('Parameters are wrong type.');
			return 
		}

		// starting at the end of the array and going to 0 so the order of the array is corect

		var i=arr.length-1

		while (i>=0) {
			
			this.InsertElementFirstIndex(arr[i])
			i--
		}


	}

	

	ClearLinkedList(){

		//this will clear all elements in the linked list.

		this.#head=null
		this.#size=0;
		this.#lastNode=null
		this.#lastPlaced=false;


	}
	SwapNodesLinkedList(k){

		// this function swaps the values of the kth node from the beginning and the kth node from the end 
		// the index should be 1-indexed
		var head=this.#head
		var head2=this.#head
		var beginningNode=undefined
		var endingNode=undefined;

		var i=1;
		while (i<k) {
			
			head=head.next
			i++

		}
		beginningNode=head

		while (head.next) {
			
			head=head.next
			head2=head2.next

		}
		endingNode=head2

		var save=beginningNode.data
		beginningNode.data=endingNode.data
		endingNode.data=save

		return this.#head


		




	}



	returnSize(){

		//just returns the size of the linked list
		return this.#size
	}
	 ReturnHead(){

		var headclone=this.#head
		return headclone


	 }

	 GetFirst(){

		return this.#head.data

		
	 }
	 GetLast(){

		if (this.#lastNode===null) {
			return null
		}
		return this.#lastNode.data
	 }

	 Pop(){

		//classic pop function from array, removes the last element in the linked list 


	 }

	 Shift(){

		//classic shift function from array,removes the first element in the linked list

		head=head.next
		this.#size--

	 }

	 Search(searchElement){

		//unfortunately this is O(n) , i could  make the linked list sorted so i can use binary search but i'm not sure..

		var hd=this.#head

		while (hd) {
			
			if (hd.data===searchElement) {
				
				return hd.data
			}
			hd=hd.next
		}
		
		console.log('Element could not be found');
		return false


	 }






	#helperFunction(index){

		// i noticed checking the index value from the user when he wants to insert or delete it's duplicated so I put it in a function to avoid duplication
		// this is a private function so no one outside this object can access this.

		if (typeof index!='number') {
			
			console.log('Error,Index should be a number !');
			return false

		}
		if (Number.isInteger(index)===false) {
			
			console.log('Error,Index should be an whole number !');
			return false
			
		}
		if (index>this.#size) {
			
			console.log('Error,Index is bigger than the linked list size.')
			return false
		}
		if (index<0) {
			
			console.log('Error,Index is smaller than 0.');
			return false;
			
			
		}

		return true;
	}


}


var lk=new MyLinkedList()


lk.InsertElementLastIndex(7)
lk.InsertElementLastIndex(9)
lk.InsertElementLastIndex(6)
lk.InsertElementLastIndex(6)
lk.InsertElementLastIndex(7)
lk.InsertElementLastIndex(8)
lk.InsertElementLastIndex(3)
lk.InsertElementLastIndex(0)
lk.InsertElementLastIndex(9)
lk.InsertElementLastIndex(5)


console.log(JSON.stringify(lk.ReturnHead()));

lk.SwapNodesLinkedList(5)
console.log(JSON.stringify(lk.ReturnHead()));

