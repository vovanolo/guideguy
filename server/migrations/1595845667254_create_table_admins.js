module.exports = {
    "up": "CREATE TABLE `admins` (`id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(535) NOT NULL, `password` varchar(535) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE admins"
}