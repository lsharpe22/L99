-- Create table for monthly AI development trends
CREATE TABLE ai_monthly_trends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month_year VARCHAR(7) NOT NULL, -- Format: 2024-09
  total_releases INT NOT NULL,
  major_updates INT NOT NULL,
  new_models INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert monthly trend data based on AI developments
INSERT INTO ai_monthly_trends (month_year, total_releases, major_updates, new_models) VALUES
('2024-07', 8, 3, 5),
('2024-08', 12, 5, 7),
('2024-09', 15, 6, 9),
('2024-10', 18, 8, 10),
('2024-11', 22, 10, 12),
('2024-12', 25, 12, 13);