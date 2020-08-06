module.exports = {
  'up': 'CREATE TABLE `challenges` (`id` int(11) NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4',
  'down': 'DROP TABLE challenges',
};