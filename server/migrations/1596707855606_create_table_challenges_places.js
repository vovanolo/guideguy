module.exports = {
    "up": "CREATE TABLE `challenges_places` (`id` int(11) NOT NULL AUTO_INCREMENT, `challenge_id` int(11) NOT NULL, `place_id` int(11) NOT NULL, `places_order` int(11) NOT NULL, `completed` tinyint(1) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    "down": "DROP TABLE challenges_places"
};