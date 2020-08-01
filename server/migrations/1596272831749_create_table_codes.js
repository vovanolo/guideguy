module.exports = {
    "up": "CREATE TABLE `codes` (`id` int NOT NULL AUTO_INCREMENT, `placeId` int NOT NULL, `code` varchar(535) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `code` (`code`)) ENGINE=InnoDB CHARSET=utf8mb4",
    "down": "DROP TABLE codes"
}