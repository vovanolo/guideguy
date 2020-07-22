module.exports = {
    "up": "CREATE TABLE `places` (`id` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(535) NOT NULL, `adress` varchar(535) NOT NULL, `latlng` varchar(64) NOT NULL, `thumbnail` varchar(535) NOT NULL, `description` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE places"
}