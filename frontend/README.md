# Sebelum memulai PASTIKAN

`npm i`

# Untuk memulai project

`npm start`


# Database

## Users Database

```CREATE TABLE `sosmed`.`users` (`id` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `displayname` VARCHAR(45) NOT NULL, `coverpic` VARCHAR(100) NULL, `profilepic` VARCHAR(100) NULL ,`biodata` VARCHAR(255) NOT NULL, city VARCHAR(45) NULL, `joinat` VARCHAR(45), PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC)); ```

## Post Database

```CREATE TABLE `sosmed`.`posts` (`id` INT NOT NULL AUTO_INCREMENT, `desc` VARCHAR(200) NULL, `img` VARCHAR(200) NULL, `userid` INT NOT NULL, `createdat` DATETIME NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `userid_idx` (`userid` ASC), CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

## Comments Database

```CREATE TABLE `sosmed`.`comments` (`id` INT NOT NULL AUTO_INCREMENT, `desc` VARCHAR(255) NOT NULL,  `img` VARCHAR(255) NOT NULL, `createdat` DATETIME NULL, `userid` INT NOT NULL, `postid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `postid_idx` (`postid` ASC), INDEX `commentsuserid_idx` (`userid` ASC), CONSTRAINT `comments_userid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `comments_postid` FOREIGN KEY (`postid`) REFERENCES `sosmed`.`posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

## Relationships Database

```CREATE TABLE `sosmed`.`relationships` (`id` INT NOT NULL AUTO_INCREMENT, `followeruserid` INT NOT NULL, `followeduserid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `followeruser_idx` (`followeruserid` ASC), INDEX `followeduser_idx` (`followeduserid` ASC), CONSTRAINT `followeruser` FOREIGN KEY (`followeruserid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `followeduser` FOREIGN KEY (`followeduserid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

## Likes Database

```CREATE TABLE `sosmed`.`likes` (`id` INT NOT NULL AUTO_INCREMENT, `userid` INT NOT NULL, `postid` INT NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), INDEX `likesuserid_idx` (`userid` ASC), INDEX `likespostid_idx` (`postid` ASC), CONSTRAINT `likesuserid` FOREIGN KEY (`userid`) REFERENCES `sosmed`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `likespostid` FOREIGN KEY (`postid`) REFERENCES `sosmed`.`posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE); ```

# Dokumentasi

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

[React documentation](https://reactjs.org/)

ALTER TABLE `users` ADD `biodata` VARCHAR(255) NOT NULL AFTER `profilepic`;
