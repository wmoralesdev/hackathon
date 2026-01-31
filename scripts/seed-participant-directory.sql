-- Participant Directory Seed SQL
-- Generated from public/content.txt
-- Run this script to populate the participant_directory_entries table

BEGIN;

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  1,
  'Jorge Majano',
  TRUE,
  TRUE,
  TRUE,
  '+503 6071 7118',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  1,
  'Anthony Manuel Sigaran Orellana',
  FALSE,
  TRUE,
  TRUE,
  '+503 6300 2676',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  1,
  'Carlos Ansorge',
  FALSE,
  TRUE,
  TRUE,
  '+503 7704 5682',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  1,
  'Steven Nuila',
  FALSE,
  TRUE,
  TRUE,
  '+503 7687 0307',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  2,
  'Alejandro Sandoval',
  TRUE,
  TRUE,
  TRUE,
  '+503 7703 1824',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  2,
  'Kenia Linares',
  FALSE,
  TRUE,
  TRUE,
  '+503 7626 3955',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  2,
  'Emerson Balmore Arévalo Orellana',
  FALSE,
  TRUE,
  TRUE,
  '+503 7005 3237',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  2,
  'Diego Javier Ayala Acevedo',
  FALSE,
  TRUE,
  TRUE,
  '+503 7650 6834',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  3,
  'Alex Roberto Mata Cerritos',
  TRUE,
  TRUE,
  TRUE,
  '+503 7005 8673',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  3,
  'Manuel Alejandro Hurtado Pineda',
  FALSE,
  TRUE,
  TRUE,
  '+503 7298 0166',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  3,
  'Stanley Melgar',
  FALSE,
  TRUE,
  TRUE,
  '+503 7813 0721',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  3,
  'Cristian Antonio Escalante Hernandez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7873 5860',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  4,
  'Artemio Rivera',
  TRUE,
  TRUE,
  TRUE,
  '+503 7713 6272',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  4,
  'Ricardo Fuentes',
  FALSE,
  TRUE,
  TRUE,
  '+503 7317 2743',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  4,
  'Karla Santana',
  FALSE,
  TRUE,
  TRUE,
  '+503 7083 7154',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  4,
  'Roberto Alejandro Juárez Pacheco',
  FALSE,
  TRUE,
  TRUE,
  '+503 7350 8827',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  5,
  'Astrid Aleman',
  TRUE,
  TRUE,
  TRUE,
  '+503 7030 7060',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  5,
  'José Miguel Rivera López',
  FALSE,
  TRUE,
  TRUE,
  '+503 7227 4441',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  5,
  'Cesar Guerrero',
  FALSE,
  TRUE,
  TRUE,
  '+503 7225 1878',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  5,
  'Roberto Flores',
  FALSE,
  TRUE,
  TRUE,
  '+503 7737 2990',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  5,
  'Mauricio Gomez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7886 1215',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  7,
  'Cristian Carballo',
  TRUE,
  TRUE,
  TRUE,
  '+503 7623 0741',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  7,
  'Karla Fuentes',
  FALSE,
  TRUE,
  TRUE,
  '+503 7269 8263',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  8,
  'Daniela Huezo',
  TRUE,
  TRUE,
  TRUE,
  '+503 7095 6453',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  8,
  'Alessandro Rivas',
  FALSE,
  TRUE,
  TRUE,
  '+503 7343 4348',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  8,
  'Fernando Rodríguez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7028 1079',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  8,
  'Beatriz Del Pinal',
  FALSE,
  TRUE,
  TRUE,
  '+503 7701 7929',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  11,
  'Diego Vega',
  TRUE,
  TRUE,
  TRUE,
  '+503 6306 3691',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  11,
  'Gerardo Javier Valle Navarro',
  FALSE,
  TRUE,
  TRUE,
  '+503 7569 9832',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  12,
  'Emerson Minero',
  TRUE,
  TRUE,
  TRUE,
  '+503 7600 6449',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  12,
  'Ever Sanchez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7269 9641',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  12,
  'Ricardo Castaneda',
  FALSE,
  TRUE,
  TRUE,
  '+503 7740 7075',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  12,
  'Caleb Rodriguez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7600 1850',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  13,
  'Erick Saravia',
  TRUE,
  TRUE,
  FALSE,
  '+503 7102 1375',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  13,
  'Paulino Vasquez',
  FALSE,
  TRUE,
  FALSE,
  '+503 7802 1093',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  13,
  'Roberto Lainez',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  13,
  'Isai Portillo',
  FALSE,
  TRUE,
  FALSE,
  '+503 7014 0024',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  15,
  'Erick Viscarra',
  TRUE,
  TRUE,
  TRUE,
  '+503 7602 9466',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  15,
  'Boanerges Eduardo Alvarado Rosas',
  FALSE,
  TRUE,
  TRUE,
  '+503 6016 6250',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  15,
  'Fernando Fuentes',
  FALSE,
  TRUE,
  TRUE,
  '+503 6993 9419',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  15,
  'Diego Viscarra',
  FALSE,
  TRUE,
  TRUE,
  '+503 7064 4326',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  16,
  'Giancarlo Pablo',
  TRUE,
  TRUE,
  TRUE,
  '+503 6133 6814',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  16,
  'Nelson Hernández',
  FALSE,
  TRUE,
  TRUE,
  '+503 7382 1019',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  16,
  'Eva Magaña',
  FALSE,
  TRUE,
  TRUE,
  '+503 7743 7490',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  16,
  'Noah Lara',
  FALSE,
  TRUE,
  TRUE,
  '+503 7753 4823',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  17,
  'Gino Stefano Miles Martínez',
  TRUE,
  TRUE,
  TRUE,
  '+503 7408 2180',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  17,
  'Iris Miles',
  FALSE,
  TRUE,
  TRUE,
  '+503 7396 8201',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  17,
  'Ervin Josue Cardona Fuentes',
  FALSE,
  TRUE,
  TRUE,
  '+503 7766 7263',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  17,
  'Manuel Alexander Morales Mejía',
  FALSE,
  TRUE,
  TRUE,
  '+503 7653 2213',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  18,
  'Ingrid López',
  TRUE,
  TRUE,
  TRUE,
  '+502 4703 5917',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  18,
  'Rocael López',
  FALSE,
  TRUE,
  TRUE,
  '+502 4776 5168',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  19,
  'Kevin Silva',
  TRUE,
  TRUE,
  FALSE,
  '+503 7157 3001',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  19,
  'Israel Gonzales',
  FALSE,
  TRUE,
  FALSE,
  '+503 7808 1307',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  21,
  'Jesús Gerardo Esquivel Ramírez',
  TRUE,
  TRUE,
  TRUE,
  '+503 7708 5832',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  21,
  'Sey Guadalupe Alvarado Najarro',
  FALSE,
  TRUE,
  TRUE,
  '+503 6312 8512',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  21,
  'Oscar Orellana',
  FALSE,
  TRUE,
  TRUE,
  '+503 7668 4927',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  21,
  'Ronald Eduardo Mejia',
  FALSE,
  TRUE,
  TRUE,
  '+503 7955 6244',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  21,
  'Lenny Adrián Elías Sánchez',
  FALSE,
  TRUE,
  TRUE,
  '+503 6308 1131',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'Jorge Monge',
  TRUE,
  TRUE,
  TRUE,
  '+503 7161 6210',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'Elison Isai Gonzalez Sanchez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7087 7599',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'OSMIN ARIEL LOPEZ CLAROS',
  FALSE,
  TRUE,
  TRUE,
  '+503 7444 4297',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'Rony Bonilla',
  FALSE,
  TRUE,
  TRUE,
  '+503 7387 2514',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'Roque Josue Aquino',
  FALSE,
  TRUE,
  TRUE,
  '+503 7035 1340',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  22,
  'Jose Lara',
  FALSE,
  TRUE,
  TRUE,
  '+503 7489 7652',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  23,
  'Josue Citalan',
  TRUE,
  TRUE,
  TRUE,
  '+502 3059 8114',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  23,
  'Carlos Hernandez',
  FALSE,
  TRUE,
  TRUE,
  '+502 5316 1679',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  23,
  'Arun Solis',
  FALSE,
  TRUE,
  TRUE,
  '+502 4615 5228',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  23,
  'James Maradiaga',
  FALSE,
  TRUE,
  TRUE,
  '+502 5568 2638',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  24,
  'Lisbeth Argueta',
  TRUE,
  TRUE,
  TRUE,
  '+503 7798 0998',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  24,
  'Julio Daniel Guardado Martínez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7959 1765',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  24,
  'Harold Manzano',
  FALSE,
  TRUE,
  TRUE,
  '+503 7126 2384',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  24,
  'Marlon Rivas',
  FALSE,
  TRUE,
  TRUE,
  '+503 7733 7519',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  24,
  'Victor Iteriano',
  FALSE,
  TRUE,
  TRUE,
  '+503 7218 7800',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  25,
  'Marcelo Guerra',
  TRUE,
  TRUE,
  TRUE,
  '+503 7869 6936',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  25,
  'Cristina Rosa',
  FALSE,
  TRUE,
  TRUE,
  '+503 7092 1927',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  25,
  'Alexis Cabrera',
  FALSE,
  TRUE,
  TRUE,
  '+503 7861 4654',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  25,
  'Diego Arévalo',
  FALSE,
  TRUE,
  TRUE,
  '+503 7620 2883',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  25,
  'Kathia Gómez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7916 4921',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  26,
  'Marvin Ramos',
  TRUE,
  TRUE,
  TRUE,
  '+503 7579 0849',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  26,
  'Gabriel Campos',
  FALSE,
  TRUE,
  TRUE,
  '+503 7102 3223',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  26,
  'Angie Espinoza',
  FALSE,
  TRUE,
  TRUE,
  '+503 6828 4408',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  26,
  'Fernando Pineda',
  FALSE,
  TRUE,
  TRUE,
  '+503 7732 3184',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  27,
  'Monica Diaz',
  TRUE,
  TRUE,
  TRUE,
  '+503 7400 4702',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  27,
  'Gabriel Navarro',
  FALSE,
  TRUE,
  TRUE,
  '+503 6920 2368',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  27,
  'Julio Gomez',
  FALSE,
  TRUE,
  TRUE,
  '+503 6937 9577',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  28,
  'Odil Adrián Flores Girón',
  TRUE,
  TRUE,
  TRUE,
  '+503 7270 3187',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  28,
  'Albert Reyes',
  FALSE,
  TRUE,
  TRUE,
  '+503 7672 0297',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  28,
  'Gabriel Alejandro Linares Sandoval',
  FALSE,
  TRUE,
  TRUE,
  '+503 7583 8199',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  28,
  'Jeferson Alessandro Velasquez Rivera',
  FALSE,
  TRUE,
  TRUE,
  '+503 7587 6663',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  29,
  'Omar Zúniga',
  TRUE,
  TRUE,
  FALSE,
  '+503 7299 9689',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  29,
  'Dina Escobar',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  30,
  'Rafael Angel Aquino Hernández',
  TRUE,
  TRUE,
  FALSE,
  '+503 7289 1344',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  30,
  'Karla alvarez',
  FALSE,
  TRUE,
  FALSE,
  '+503 6982 4644',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  31,
  'Rafael Romero Rugamas',
  TRUE,
  TRUE,
  FALSE,
  '+503 7140 9231',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  31,
  'Miguel Angel Jerónimo Mejía',
  FALSE,
  TRUE,
  FALSE,
  '+503 7961 9391',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  31,
  'Josue Molina',
  FALSE,
  TRUE,
  FALSE,
  '+503 7728 4753',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  32,
  'Rene Garcia',
  TRUE,
  TRUE,
  TRUE,
  '+503 7729 8463',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  32,
  'Rodrigo Soriano',
  FALSE,
  TRUE,
  TRUE,
  '+503 7808 9874',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  32,
  'Melissa Pleitez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7833 4935',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  33,
  'Roberto Arrieta',
  TRUE,
  TRUE,
  TRUE,
  '+503 7987 2106',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  33,
  'Gabriel Campos',
  FALSE,
  TRUE,
  TRUE,
  '+503 7501 9794',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  33,
  'Nataly Ponce',
  FALSE,
  TRUE,
  TRUE,
  '+503 7264 6395',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  34,
  'Ronald Ernesto Tejada Rios',
  TRUE,
  TRUE,
  TRUE,
  '+503 7923 4790',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  34,
  'Raúl Peñate Ramírez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7485 1430',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  34,
  'Fiorella Menendez Garcia',
  FALSE,
  TRUE,
  TRUE,
  '+503 7396 8149',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  34,
  'Alejandro Rodriguez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7175 9420',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  35,
  'Saul Calderon',
  TRUE,
  TRUE,
  TRUE,
  '+503 7308 9096',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  35,
  'Guillermo Andres Minero Minero',
  FALSE,
  TRUE,
  TRUE,
  '+503 7795 8125',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  35,
  'Guillermo Cartagena',
  FALSE,
  TRUE,
  TRUE,
  '+503 7566 6222',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  36,
  'Xavier Benavides',
  TRUE,
  TRUE,
  FALSE,
  '+503 7575 4330',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  36,
  'Henry Benavides',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  36,
  'Diego Steev Clemente',
  FALSE,
  TRUE,
  FALSE,
  '+503 6017 6208',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  37,
  'Eyvind Rafael Mendoza',
  TRUE,
  TRUE,
  TRUE,
  '60511036',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  37,
  'Julio Gutierrez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7829 8492',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  37,
  'Victor Guidos',
  FALSE,
  TRUE,
  TRUE,
  '+503 6183 4009',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  37,
  'esalexander20',
  FALSE,
  TRUE,
  TRUE,
  '+507 295 4190',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  38,
  'Alexandra',
  TRUE,
  TRUE,
  FALSE,
  '+503 6138 1988',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  38,
  'Keren Muñoz',
  FALSE,
  TRUE,
  FALSE,
  '+503 7750 0557',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  38,
  'Cristian Moisés Parada Mendoza',
  FALSE,
  TRUE,
  FALSE,
  '+503 7015 3564',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  38,
  'Cristian Carias',
  FALSE,
  TRUE,
  FALSE,
  '+503 7327 3397',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  39,
  'Luis Jose Ramirez Sierra',
  TRUE,
  TRUE,
  TRUE,
  '+503 7952 5185',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  39,
  'Luis Velasquez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7700 3883',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  39,
  'Luis Ramos',
  FALSE,
  TRUE,
  TRUE,
  '+503 7953 8033',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  39,
  'Kenet',
  FALSE,
  TRUE,
  TRUE,
  '+503 7758 9017',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  40,
  'Enrique Madrid',
  TRUE,
  TRUE,
  TRUE,
  '+503 6205 9337',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  40,
  'Jaime Artiga',
  FALSE,
  TRUE,
  TRUE,
  '+503 73423151',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  40,
  'Danilo Valdez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7058 7207',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  40,
  'melvin',
  FALSE,
  TRUE,
  TRUE,
  '+503 7717 3434',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  41,
  'Leonel Guerrero',
  TRUE,
  TRUE,
  TRUE,
  '+503 7066 0512',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  41,
  'Luis Peraz.',
  FALSE,
  TRUE,
  TRUE,
  '+503 6162 3997',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  41,
  'Adonis Gomez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7796 1054',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  42,
  'Edwin Alexander Gómez Medrano',
  TRUE,
  TRUE,
  TRUE,
  '+503 7519 6515',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  42,
  'Jose',
  FALSE,
  TRUE,
  TRUE,
  '+503 6012 2221',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  42,
  'Roberto Antonio Alferes Gomez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7590 1373',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  42,
  'Manuel Eduardo Rivera Argueta',
  FALSE,
  TRUE,
  TRUE,
  '+503 7479 1365',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  42,
  'Enrique Reyes',
  FALSE,
  TRUE,
  TRUE,
  '+503 6979 2377',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  43,
  'Cristopher Fuentes',
  TRUE,
  TRUE,
  TRUE,
  '+503 7741 9727',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  43,
  'Victor Rodriguez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7024 3437',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  43,
  'Christian Alegría',
  FALSE,
  TRUE,
  TRUE,
  '+503 7548 2379',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  44,
  'Nicole Azucena Barahona Castro',
  TRUE,
  TRUE,
  TRUE,
  '50379971767',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  44,
  'MARIA YOLANDA PAZ',
  FALSE,
  TRUE,
  TRUE,
  '+503 7043 6498',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  44,
  'Fatima Gonzalez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7749 8345',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  45,
  'Karina Alvarez',
  TRUE,
  TRUE,
  TRUE,
  '+503 7535 0582',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  45,
  'Shers Portillo',
  FALSE,
  TRUE,
  TRUE,
  '+503 7977 9895',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  45,
  'Gabriela Urías',
  FALSE,
  TRUE,
  TRUE,
  '+503 7911 4313',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  45,
  'Estefany Quezada',
  FALSE,
  TRUE,
  TRUE,
  '+503 7208 8850',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  46,
  'Emma Godoy',
  TRUE,
  TRUE,
  TRUE,
  '+503 7707 5716',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  46,
  'Georgina de Galdamez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7170 1273',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  46,
  'Fernando Juarez',
  FALSE,
  TRUE,
  TRUE,
  '+503 7330 3280',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  46,
  'Alejandra Martinez',
  FALSE,
  TRUE,
  TRUE,
  '+503 6179 7182',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  47,
  'David Camacho',
  TRUE,
  TRUE,
  TRUE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  47,
  'Alejandro Alas',
  FALSE,
  FALSE,
  FALSE,
  '+503 7870 2444',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  47,
  'Jose España',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  47,
  'Jesus Alvarado',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  48,
  'Jonathan Cruz',
  TRUE,
  FALSE,
  FALSE,
  '+503 6423 1838',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  48,
  'Josue Martinez',
  FALSE,
  FALSE,
  FALSE,
  NULL,
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  49,
  'Bryan Mendoza',
  TRUE,
  FALSE,
  FALSE,
  '+503 7824 2417',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  49,
  'Hector Martinez',
  FALSE,
  FALSE,
  FALSE,
  '+503 6001 6713',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  49,
  'Miguel Sanchez',
  FALSE,
  FALSE,
  FALSE,
  '+503 7547 9456',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  49,
  'Oliver Ascencio',
  FALSE,
  FALSE,
  FALSE,
  '+503 7539 8164',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  49,
  'Anderson',
  FALSE,
  FALSE,
  FALSE,
  '+503 7219 0414',
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();

COMMIT;
