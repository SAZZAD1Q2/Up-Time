const twoSum = (nums, target) => {
     let map = {};
     for(let i = 1; i < nums.length; i++){
      let complement = target - nums[i];
         if(map[complement] !== undefined){
            return [map[complement], i]
         }
         map[nums[i]] =i ;
     }
}
const arr = [2,3,4,5,6,7]
console.log(twoSum(arr, 9))