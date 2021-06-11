import { arrayToTree } from "performant-array-to-tree";

export function sortCategoriesForInsert(inputJson: any) {
 
  // 1 - construct tree-structured data from input json 
  const renamingParams = {id: "id", parentId: "parent_id", childrenField: "children"};
  const tree = arrayToTree(inputJson, renamingParams);
  console.log(tree);

  // 2 - build insertion list from tree 
  var result: any[] = new Array();

  function bfsTraverse(tree: any) {
      var q:any = [];

      // push all roots to queue
      for (var index in tree) {
        q.push(tree[index]);
      }

      // iterate nodes in queue
      while ( q.length > 0) {
       
        var node = q[0]; // get first node in the queue
        result.push(node["data"]); // add to result list

        // if has children, push to queue
        if (node["children"].length > 0) {
          for (var i in node["children"]) {
            q.push(node["children"][i]);
          }
        }

        // pop current node from queue
        q.shift();
      }
  }

  bfsTraverse(tree);
  return JSON.stringify(result, null, '\t');
}
