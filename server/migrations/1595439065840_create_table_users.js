module.exports = {
    "up": "CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(32) NOT NULL, `password` varchar(535) NOT NULL, `role` varchar(16) NOT NULL DEFAULT 'user', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE users"
}