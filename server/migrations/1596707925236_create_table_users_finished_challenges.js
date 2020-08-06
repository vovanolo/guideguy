module.exports = {
    "up": "CREATE TABLE `users_finished_challenges` (`id` int(11) NOT NULL AUTO_INCREMENT,`user_id` int(11) NOT NULL,`challenge_id` int(11) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE users_finished_challenges"
}