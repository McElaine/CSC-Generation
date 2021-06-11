# Task: Sorting a category list from a flat database for insert into a hierarchy-constrained one. 

## Task source
https://bitbucket.org/dbuy/workspace/snippets/rnB4an/tech-exercise-sorting-a-category-list-from

## Dependency installation
npm install --save performant-array-to-tree

## Usage example
1. wrap up the code below as a .ts file, e.g. sort.ts: 

    import {sortCategoriesForInsert} from "./solution";


    inputJson = // prepare the input json
    var insertionList = sortCategoriesForInsert(inputJson);

    To view the result list: 

    // print to console 
    console.log(insertionList); 

    // write to json
    var fs = require('fs');
    fs.writeFile ("insertion_list.json", JSON.stringify(result, null, '\t') , function(err: any) {
    if (err) throw err;
    console.log('complete');
    }
    );

2. execute sort.ts via command line (or in your IDE)
    ts-node sort.ts

## Notes on performance
1. why chose performant-array-to-tree? 

This package converts an array of items with ids and parent ids to a nested tree in linear time (time complexity - O(n)).

More on this approach please check: https://github.com/philipstanislaus/performant-array-to-tree

2. why BFS not DFS?

Given the task, the solution should 
1) take into account that there may be tens of thousands of categories; 
2) handle the case when the taxonomy for categories is arbitrarily deep.

The second condition implies that the constructed hierarchy tree could be very deep, depth-first-search traversal might not be performant. 

However, when the width of the tree is greater than its depth, choosing depth-first-search traversal could outperform breadth-first-search. In this case, one can replace the bfsTraverse function with the following code:

function dfsTraverse(tree: any, result: any) {
    for (var index in tree) {

      // store current parent category to result list
      result.push(tree[index]["data"]);

      var node = tree[index];
      var children = node["children"];

      // if has children, dfs all children
      if (children.length > 0) {
        for (var i in children) {
          dfsTraverse(children[i], result);
        }
      }
    }
  }