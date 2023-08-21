## Sebelum memulai PASTIKAN

`npm i`

# Untuk memulai project

`npm start`


## Database

# Post Database

``` CREATE TABLE `sosmed`.`posts` (`id` INT NOT NULL AUTO_INCREMENT, `decs` VARCHAR(255) NULL, `img` VARCHAR(255) NULL, `userid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `useridx` (`userid` ASC), CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

# Comments Database

``` CREATE TABLE `sosmed`.`comments` (`id` INT NOT NULL AUTO_INCREMENT, `decs` VARCHAR(255) NULL, `date` DATETIME NULL, `userid` INT NOT NULL, `postid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `postid_idx` (`postid` ASC), INDEX `commentsuserid_idx` (`userid` ASC), CONSTRAINT `fk_comments_userid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `fk_comments_postid` FOREIGN KEY (`postid`) REFERENCES `sosmed`.`posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

# Relationship Database

``` CREATE TABLE `sosmed`.`relationship` (`id` INT NOT NULL AUTO_INCREMENT, `followeruserid` INT NOT NULL, `followeduserid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `followeruser_idx` (`followeruserid` ASC), INDEX `followeduser_idx` (`followeduserid` ASC), CONSTRAINT `followeruser` FOREIGN KEY (`followeruserid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `followeduser` FOREIGN KEY (`followeduserid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

# Users Database

```CREATE TABLE `sosmed`.`users` (`id` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)); ```

# Likes Database

```CREATE TABLE `sosmed`.`likes` (`id` INT NOT NULL AUTO_INCREMENT, `userid` INT NOT NULL, `postid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `likesuserid_idx` (`userid` ASC), INDEX `likespost_idx` (`postid` ASC), CONSTRAINT `likesuserid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `likespostid` FOREIGN KEY (`postid`) REFERENCES `sosmed`.`posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

## Dokumentasi

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

[React documentation](https://reactjs.org/).

