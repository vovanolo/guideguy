module.exports = {
    "up": "CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(32) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE users"
}