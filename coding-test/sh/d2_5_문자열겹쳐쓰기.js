function solution(my_string, overwrite_string, s) {
    //slice
    const my_str = my_string.slice(0,s) + overwrite_string + my_string.slice(s+overwrite_string.length);
    return my_str;
    
    //splice
    // const my_str = [...my_string];
    // my_str.splice(s, overwrite_string.length, overwrite_string);
    // return my_str.join('');
}