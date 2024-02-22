import React from "react";
import classes from "./upload.module.css";


const upload = () => {
  return (
    <div className={classes.layout}>
      <div>
        <form type="submit">
          <label className={classes.title}>upload</label><br/>
          <input className={classes.lay} placeholder="title name" type="text" required /><br/>
          <input className={classes.lay} placeholder="enter link" type="link" required /><br/>
          <textarea className={classes.lay} placeholder="hashtag's" type="file" required /><br/>
          <label className={classes.upload}>   upload image here   <input className={classes.file} placeholder="image" type="file" accept="image/png, image/jpeg" required /></label><br/>
          
          <button className={classes.btn}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default upload;
