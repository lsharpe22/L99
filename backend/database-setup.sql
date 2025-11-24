
CREATE TABLE ai_innovations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  innovation_name VARCHAR(255) NOT NULL,
  innovation_type ENUM('Text', 'Image', 'Audio/Video', 'Agent/Agentic AI') NOT NULL,
  release_date DATE NOT NULL,
  company VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO ai_innovations (innovation_name, innovation_type, release_date, company, description) VALUES
('GPT-4.5', 'Text', '2024-11-01', 'OpenAI', 'Improved emotional intelligence for conversations'),
('Claude 3.5 Sonnet', 'Text', '2024-10-15', 'Anthropic', 'Enhanced reasoning capabilities'),
('Gemini 2.0', 'Text', '2024-12-01', 'Google', 'Multimodal reasoning across text, images, and audio'),
('DALL-E 3 HD', 'Image', '2024-09-20', 'OpenAI', 'Higher resolution image generation'),
('Midjourney v6', 'Image', '2024-10-01', 'Midjourney', 'Improved photorealism and text rendering'),
('Stable Diffusion 3.5', 'Image', '2024-11-15', 'Stability AI', 'Better prompt adherence'),
('Veo 2', 'Audio/Video', '2024-12-10', 'Google', 'High-quality video generation'),
('Sora Turbo', 'Audio/Video', '2024-11-30', 'OpenAI', 'Faster video generation'),
('ElevenLabs Voice 3.0', 'Audio/Video', '2024-10-10', 'ElevenLabs', 'More natural voice synthesis'),
('OpenAI Swarm', 'Agent/Agentic AI', '2024-10-25', 'OpenAI', 'Multi-agent orchestration framework'),
('Anthropic Computer Use', 'Agent/Agentic AI', '2024-11-20', 'Anthropic', 'AI that can control computers'),
('Google Astra', 'Agent/Agentic AI', '2024-12-05', 'Google', 'Real-time multimodal AI assistant'),
('DeepSeek V3', 'Text', '2024-12-15', 'DeepSeek', 'Open-source large language model'),
('Janus Pro 7B', 'Image', '2024-12-12', 'DeepSeek', 'Multimodal understanding model');