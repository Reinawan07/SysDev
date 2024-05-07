CREATE DATABASE SysScores;


CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    emotion VARCHAR(255) NOT NULL,
    created DATE NOT NULL
);


INSERT INTO scores (name, score, emotion, created)
VALUES 
    ('Kevin', 80, 'Happy', '2020-02-20'),
    ('Josh', 90, 'Sad', '2020-02-20'),
    ('Kevin', 85, 'Happy', '2020-02-20'),
    ('Kevin', 75, 'Sad', '2020-02-20'),
    ('Josh', 65, 'Angry', '2020-02-20'),
    ('David', 85, 'Happy', '2020-02-21'),
    ('Josh', 90, 'Sad', '2020-02-21'),
    ('David', 75, 'Sad', '2020-02-21'),
    ('Josh', 85, 'Sad', '2020-02-21'),
    ('Josh', 70, 'Happy', '2020-02-21'),
    ('Kevin', 80, 'Sad', '2020-02-21'),
    ('Kevin', 73, 'Sad', '2020-02-22'),
    ('Kevin', 75, 'Angry', '2020-02-22'),
    ('David', 82, 'Sad', '2020-02-22'),
    ('David', 65, 'Sad', '2020-02-22');
    
   
SELECT name, AVG(score) AS average_score
FROM scores
GROUP BY name;


SELECT
    name, 
    emotion AS mode_emotion,
    COUNT(emotion) AS frequency
FROM 
    scores
GROUP BY 
    name, emotion
HAVING 
    COUNT(emotion) = (
        SELECT 
            MAX(freq_count) 
        FROM 
            (SELECT 
                name, 
                emotion, 
                COUNT(emotion) AS freq_count
            FROM 
                scores
            GROUP BY 
                name, emotion
            ) AS temp
        WHERE 
            temp.name = scores.name
    );


   
SELECT 
    name,
    created AS date,
    AVG(score) AS average_score,
    (
        SELECT 
            emotion
        FROM 
            (
                SELECT 
                    emotion, 
                    COUNT(emotion) AS emotion_count
                FROM 
                    scores s2
                WHERE 
                    s2.name = s1.name AND s2.created = s1.created
                GROUP BY 
                    emotion
                ORDER BY 
                    emotion_count DESC
                LIMIT 1
            ) AS mode_query
    ) AS mode_emotion
FROM 
    scores s1
GROUP BY 
    name, created;




