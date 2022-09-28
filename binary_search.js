function Node(data,left=null,right=null){
    return {
        data,
        left,
        right
    }
}

function Tree(array){
    return {
        array:array,
        buildTree:function(){
            // remove duplicate 
            let newArray = [...new Set(this.array)]
            // sort by number 
            newArray.sort(function(a,b){return(a-b)})
            if (newArray.length==0){
                return;
            }
            else if (newArray.length==1){
                return Node(newArray.at(0))
            }
            else {
            // assign left root right 
            
            let index = Math.floor(newArray.length/2)
            
            let left = Tree(newArray.slice(0,index)).buildTree()
            let right = Tree(newArray.slice(index+1)).buildTree()
            let root =Node(newArray.at(index),left,right)
            return root
        }
        },
        insert:function(value,root){
            //const root= this.buildTree()
            let current = Object.assign({},root);
            while (current){
            if (current.data<value){
                if (!current.right){
                    current.right= Node(value)
                    return root
                }
                //go right
                current = current.right
            }
            else if (current.data>value){
                if (!current.left){
                    current.left = Node(value);
                    return root
                }
                // go left
                current= current.left
            }
            else{
                // do nothing if the value is already in the tree
                return root;
            }
        }
        },

        find: function(value) {
            let current = this.buildTree();
            while (true){
                if (current.data<value){
                    if (!current.right){
                        return null;
                    }
                    // go right
                    current = current.right 
                }
                else if (current.data>value){
                    if (!current.left){
                        return null;
                    }
                    // go left 
                    current = current.left 
                }
                else {
                    // found
                    return current
                }
            }

        },
        delete: function(value){
            const root= this.buildTree();
            let current = Object.assign({},root);
            let path = [current];
            let direction = []
            while (true){
                if (current.data<value){
                    if (!current.right){
                        return null;
                    }
                    // go right
                    path.push(current)
                    direction.push('right')
                    current = current.right 
                }
                else if (current.data>value){
                    if (!current.left){
                        return null;
                    }
                    // go left 
                    path.push(current)
                    direction.push('left')
                    current = current.left 

                }
                else {
                    // found the node with the value 
                    const last = path.at(-1)
                    const d = direction.at(-1)
                    // if node is a leave 
                    if (!current.left & !current.right){
                        last[d] = null;
                        return root;
                    }
                    // if node have one child 
                    else if (!(current.left) | !(current.right)){
                        if (current.left){
                            last[d] = current.left
                            return root
                        }
                        else if (current.right){
                            last[d] = current.right
                            return root
                        }
                    }
                    // node has two children
                    else {
                        let replace=current.right;
                        // find node with least higher value
                        const leftNode = current.left 
                        const rightNode = current.right;
                        current = current.right;
                        let pathReplace = [current]
                        while (current.left){
                           replace = current.left 
                           current = current.left
                           pathReplace.push(current)
                        }
                        // if replace has no child 
                        if (!current.left & !current.right){
                        last[d] = replace;
                        replace.left = leftNode
                        return root
                        }
                        // if replace has child
                        // doesn't exist
                        else {
                            last[d] = replace;
                            replace.left = leftNode
                            replace.right = rightNode;
                        }
                    }

                    
                }
            }

        },
        levelOrder: function(root=this.buildTree(),call=null){
            let que = [root]
            let result = [root.data]

            while (que.length>0){
            const first= que.shift()
            if (first.left){
                result.push(first.left.data)
                que.push(first.left)
            }
            if (first.right){
                result.push(first.right.data)
                que.push(first.right)
            }
            }
            if (call){
                let ls = []
                for (i of result){
                    ls.push(call(i))
                }
                return ls
            }
            return result
            
        }, 
        // root left right 
        preorder :function(root, call=null){
            if (call){
                const ls = this.preorder(root);
                let result = []
                for (i of ls){
                    result.push(call(i))
                }
                return result
            }
            else {
            if (!root) return [];
            else {
                return [root.data,...this.preorder(root.left),...this.preorder(root.right)]
            }
        }

    },
    // left root right 
    inorder :function(root,call=null){
        if (call){
            const ls = this.inorder(root);
            let result = []
            for (i of ls){
                result.push(call(i))
            }
            return result
        }
        else {
        if (!root) return [];
        else {
            return [...this.inorder(root.left),root.data,...this.inorder(root.right)]
        }
    }

},
   // left right root 
   postorder :function(root,call=null){
    if (call){
        const ls = this.postorder(root);
        let result = []
        for (i of ls){
            result.push(call(i))
        }
        return result
    }
    else {
    if (!root) return [];
    else {
        return [...this.postorder(root.left),...this.postorder(root.right),root.data]
    }
}

},
// return to the step number from the node to the bottom leave(longest)
height: function(node){
    if (!node){
        return 0
    }
    let que = [node];
    let count = -1;
    while (que.length>0){
        count ++;
        let temp = []
        for(let i of que){
          if (i.left){
            temp.push(i.left)
          }
          else if (i.right){
            temp.push(i.right)
          }
          que = [...temp]
    }
    }
    return count

    
},
// return to the step  the root  to the node
depth: function(node){
    let step =0;
    let current = this.buildTree(); 
    while (true){
        if (node.data>current.data){
            if (!current.right){
                // the node doesn't exist
                return;
            }
            // go right
            current = current.right
            step++
        }
        else if (node.data<current.data){
            if (!current.left){
                //the node doesn't exist
                return;
            }
            // go left
            current = current.left;
            step++
        }
        else {
            //found the node 
            return step;
        }
    }

},
isBalanced2: function(root){
    if(Math.min(...this.isBalanced(root))==1){
        return true;
    }
    else {
        return false;
    }
},
isBalanced: function(root){
  if (!root){
    return []
  }
  let left =root.left;
  let right = root.right;
  const result = Math.abs(this.height(left) - this.height(right))<=1;

  return [result, ...this.isBalanced(left),...this.isBalanced(right)]
},
rebalance:function(root){
    // update array
    this.array = this.preorder(root)
    return this.buildTree()
}
}
}



const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

// test 
//let a = [20,30,40,32,34,36,38,50,70,60,65,80,75,81,85,21]

//tree = Tree(a)


// insert test 
// prettyPrint(tree.insert(41))


// find test 
//console.log(tree.find(30))


// delete test 

//leave 
//prettyPrint(tree.delete(70))

// node with one child 
//prettyPrint(tree.delete(85))


// node with two children 

// replacement has no child 
//prettyPrint(tree.buildTree())
//prettyPrint(tree.delete(65))

// replacement has one child 
//  this doesn't exist
//prettyPrint(tree.buildTree())


// level order test 

//prettyPrint(tree.buildTree())
//console.log(tree.levelOrder())

function isEven(x){
    return x%2==0
}

//console.log(tree.levelOrder(isEven))


// test preorder 

//prettyPrint(tree.buildTree())
//console.log(tree.preorder(tree.buildTree()))
//console.log(tree.preorder(tree.buildTree(),isEven))

// test inorder 

//prettyPrint(tree.buildTree())
//console.log(tree.inorder(tree.buildTree()))
//console.log(tree.inorder(tree.buildTree(),isEven))

//prettyPrint(tree.buildTree())
//console.log(tree.postorder(tree.buildTree()))
//console.log(tree.postorder(tree.buildTree(),isEven))


// height test
// prettyPrint(tree.buildTree())
// console.log(tree.height(tree.find(81)));


// depth test
//prettyPrint(tree.buildTree())
//console.log(tree.depth(tree.find(20)));


// isBalanced test 
//console.log(tree.isBalanced2(tree.buildTree()))
// add random numbers
 //let newRoot = tree.buildTree()
 //for (let i=0;i<100;i++){
 //    newRoot = tree.insert(Math.floor(Math.random() * 100),newRoot) 
 //}
 //console.log(tree.isBalanced2(newRoot))

 //prettyPrint(tree.rebalance(newRoot))



 // tie it all together 


function tieTogether(){
   let randoms =[]
   for (let i=0;i<50;i++){
    randoms.push(Math.floor(Math.random() *100))
    }
    tree = Tree(randoms)
    const root = tree.buildTree()
    prettyPrint(root)
    //is balanced
    console.log(`isBalanced: ${tree.isBalanced2(root)}`)
    // print all 
    console.log(tree.levelOrder())
    console.log(tree.preorder(root))
    console.log(tree.postorder(root))
    console.log(tree.inorder(root))

    // add 100 random numbers to make it unbalance
    let newRoot = root
    for (let i=0;i<50;i++){
            newRoot = tree.insert(Math.floor(Math.random() * 200),newRoot) 
        }
    prettyPrint(newRoot);
    // print all
    console.log(`isBalanced: ${tree.isBalanced2(newRoot)}`)
    console.log(tree.levelOrder(newRoot))
    console.log(tree.preorder(newRoot))
    console.log(tree.postorder(newRoot))
    console.log(tree.inorder(newRoot))

    // rebalance
    let lastRoot = tree.rebalance(newRoot)

    prettyPrint(lastRoot);
    console.log(`isBlanced ${tree.isBalanced2(lastRoot)}`);
    // print all
    console.log(tree.levelOrder(lastRoot))
    console.log(tree.preorder(lastRoot))
    console.log(tree.postorder(lastRoot))
    console.log(tree.inorder(lastRoot))
    
}

tieTogether()