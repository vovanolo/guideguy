module.exports = {
    "up": "CREATE TABLE `visited_places` (`id` int(11) NOT NULL AUTO_INCREMENT, `userId` int(11) NOT NULL, `placeId` int(11) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE visited_places"
}