--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-22 00:25:18 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16610)
-- Name: moviez; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA moviez;


ALTER SCHEMA moviez OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16611)
-- Name: genre; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.genre (
    genre_id character varying(50) NOT NULL,
    genre_name character varying(50) NOT NULL
);


ALTER TABLE moviez.genre OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16694)
-- Name: genre_movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.genre_movie (
    gm_genre_id character varying(50) NOT NULL,
    gm_movie_id character varying(50) NOT NULL
);


ALTER TABLE moviez.genre_movie OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16616)
-- Name: lang; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.lang (
    lang_id character varying(50) NOT NULL,
    lang_name character varying(50) NOT NULL
);


ALTER TABLE moviez.lang OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16704)
-- Name: lang_movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.lang_movie (
    lm_lang_id character varying(50) NOT NULL,
    lm_movie_id character varying(50) NOT NULL
);


ALTER TABLE moviez.lang_movie OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16663)
-- Name: lst; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.lst (
    lst_id character varying(50) NOT NULL,
    lst_usr_id character varying(50) NOT NULL,
    lst_name character varying(50) NOT NULL,
    lst_private smallint DEFAULT 0 NOT NULL,
    lst_timestamp timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE moviez.lst OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16669)
-- Name: lst_movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.lst_movie (
    lst_id character varying(50) NOT NULL,
    movie_id character varying(50) NOT NULL,
    lst_movie_time time with time zone DEFAULT now() NOT NULL
);


ALTER TABLE moviez.lst_movie OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16650)
-- Name: movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.movie (
    movie_id character varying(50) NOT NULL,
    movie_name character varying(50) NOT NULL,
    movie_imdb character varying(70) NOT NULL,
    movie_year integer NOT NULL,
    movie_trailer character varying(70) NOT NULL,
    movie_img character varying(300) DEFAULT 'movie.jpg'::character varying NOT NULL
);


ALTER TABLE moviez.movie OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16644)
-- Name: pers; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.pers (
    pers_id character varying(50) NOT NULL,
    pers_fn character varying(50) NOT NULL,
    pers_ln character varying(50) NOT NULL,
    pers_imdb character varying(50) NOT NULL,
    pers_img character varying(300) DEFAULT 'actor.jpg'::character varying NOT NULL
);


ALTER TABLE moviez.pers OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16689)
-- Name: pers_movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.pers_movie (
    pm_pers_id character varying(50) NOT NULL,
    pm_movie_id character varying(50) NOT NULL,
    role smallint NOT NULL
);


ALTER TABLE moviez.pers_movie OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16681)
-- Name: rating; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.rating (
    rating_user_id character varying(50) NOT NULL,
    rating_movie_id character varying(50) NOT NULL,
    rating numeric NOT NULL,
    "time" time with time zone DEFAULT now() NOT NULL
);


ALTER TABLE moviez.rating OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16621)
-- Name: serv; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.serv (
    serv_id character varying(50) NOT NULL,
    serv_name character varying(50) NOT NULL
);


ALTER TABLE moviez.serv OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16699)
-- Name: serv_movie; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.serv_movie (
    sm_service_id character varying(50) NOT NULL,
    sm_movie_id character varying(50) NOT NULL
);


ALTER TABLE moviez.serv_movie OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16656)
-- Name: usr; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.usr (
    usr_id character varying(50) NOT NULL,
    usr_name character varying(50) NOT NULL,
    usr_mail character varying(50) NOT NULL,
    usr_passhash character varying(60) NOT NULL,
    usr_img character varying(300) DEFAULT 'user.jpg'::character varying NOT NULL,
    usr_role smallint DEFAULT 0 NOT NULL
);


ALTER TABLE moviez.usr OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16675)
-- Name: watched; Type: TABLE; Schema: moviez; Owner: postgres
--

CREATE TABLE moviez.watched (
    watched_user_id character varying(50) NOT NULL,
    watched_movie_id character varying(50) NOT NULL,
    watched_time timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE moviez.watched OWNER TO postgres;

--
-- TOC entry 3690 (class 0 OID 16611)
-- Dependencies: 216
-- Data for Name: genre; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.genre (genre_id, genre_name) FROM stdin;
a52b95de-95e6-4c7b-8523-d0d6f1c4c7c8	Action
9fbf8a32-8621-4786-979d-90f3bc72f38e	Adventure
5a07a8c1-9db3-4ed7-b3f0-8af74c50469c	Comedy
193edfd3-5b35-4e6a-972e-1976b9606bc3	Drama
8cc3b4e2-3a06-4e4a-9bfc-dacca8c47ef6	Fantasy
dbda50dd-8dce-4811-b96f-1d62ee90c8d9	Horror
1a1f2c60-5843-4370-8db9-64944b63aeab	Mystery
7c7127f3-6dce-45d3-9a46-6eb0f582a6d5	Sci-Fi
b6f64823-4e27-4be2-93a7-7b19c6b1e5b1	Thriller
16f1b016-200f-4ee1-95aa-b45fc79e2ca2	Romance
\.


--
-- TOC entry 3701 (class 0 OID 16694)
-- Dependencies: 227
-- Data for Name: genre_movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.genre_movie (gm_genre_id, gm_movie_id) FROM stdin;
a52b95de-95e6-4c7b-8523-d0d6f1c4c7c8	3889d85e-2897-441c-b6f5-6a11f9bcb083
193edfd3-5b35-4e6a-972e-1976b9606bc3	3889d85e-2897-441c-b6f5-6a11f9bcb083
b6f64823-4e27-4be2-93a7-7b19c6b1e5b1	3889d85e-2897-441c-b6f5-6a11f9bcb083
193edfd3-5b35-4e6a-972e-1976b9606bc3	9bf33e9c-19e6-4c95-8cc2-4fb87d033165
193edfd3-5b35-4e6a-972e-1976b9606bc3	976dedaa-06ba-4425-8a59-9585fba7c1bf
b6f64823-4e27-4be2-93a7-7b19c6b1e5b1	976dedaa-06ba-4425-8a59-9585fba7c1bf
193edfd3-5b35-4e6a-972e-1976b9606bc3	523f9364-67a3-462d-bdc8-1b9e29e60f92
a52b95de-95e6-4c7b-8523-d0d6f1c4c7c8	523f9364-67a3-462d-bdc8-1b9e29e60f92
\.


--
-- TOC entry 3691 (class 0 OID 16616)
-- Dependencies: 217
-- Data for Name: lang; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.lang (lang_id, lang_name) FROM stdin;
9918da25-2f44-4f55-916f-7c5288e2e713	English
07bdfaa6-62db-4268-8d58-54d419d626c4	French
fc975b27-faf4-41fe-af97-d652ff3e13e3	Spanish
9e5f903f-ec11-49f7-9883-5c14b973b505	Serbian
64313597-28b0-42cb-a3e6-a0964c34c708	Turkish
e97cffa6-812f-4a49-84c8-358afd4755d0	Arabic
59c6a10c-569c-439c-a912-48c3a5b3667c	Italian
\.


--
-- TOC entry 3703 (class 0 OID 16704)
-- Dependencies: 229
-- Data for Name: lang_movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.lang_movie (lm_lang_id, lm_movie_id) FROM stdin;
9918da25-2f44-4f55-916f-7c5288e2e713	9bf33e9c-19e6-4c95-8cc2-4fb87d033165
9918da25-2f44-4f55-916f-7c5288e2e713	523f9364-67a3-462d-bdc8-1b9e29e60f92
59c6a10c-569c-439c-a912-48c3a5b3667c	523f9364-67a3-462d-bdc8-1b9e29e60f92
9918da25-2f44-4f55-916f-7c5288e2e713	3889d85e-2897-441c-b6f5-6a11f9bcb083
07bdfaa6-62db-4268-8d58-54d419d626c4	976dedaa-06ba-4425-8a59-9585fba7c1bf
\.


--
-- TOC entry 3696 (class 0 OID 16663)
-- Dependencies: 222
-- Data for Name: lst; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.lst (lst_id, lst_usr_id, lst_name, lst_private, lst_timestamp) FROM stdin;
8aeb8124-19df-48cc-9e84-209a106613f1	5dcf069e-68e5-45ed-ae0c-554102116712	Test	1	2023-07-18 15:36:48.175889
d510ab50-c139-46e9-b2d8-c322d42d3322	4079f373-60bc-4bb8-be31-8440aae3a507	TestList	1	2023-07-21 14:52:55.734368
\.


--
-- TOC entry 3697 (class 0 OID 16669)
-- Dependencies: 223
-- Data for Name: lst_movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.lst_movie (lst_id, movie_id, lst_movie_time) FROM stdin;
8aeb8124-19df-48cc-9e84-209a106613f1	3889d85e-2897-441c-b6f5-6a11f9bcb083	15:36:52.46713+02
8aeb8124-19df-48cc-9e84-209a106613f1	976dedaa-06ba-4425-8a59-9585fba7c1bf	15:36:54.905479+02
d510ab50-c139-46e9-b2d8-c322d42d3322	3889d85e-2897-441c-b6f5-6a11f9bcb083	14:53:01.757035+02
\.


--
-- TOC entry 3694 (class 0 OID 16650)
-- Dependencies: 220
-- Data for Name: movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.movie (movie_id, movie_name, movie_imdb, movie_year, movie_trailer, movie_img) FROM stdin;
3889d85e-2897-441c-b6f5-6a11f9bcb083	Fight Club	https://www.imdb.com/title/tt0137523/	1999	https://www.youtube.com/watch?v=qtRKdVHc-cE	1689603794750-36604809-MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg
976dedaa-06ba-4425-8a59-9585fba7c1bf	La Haine	https://www.imdb.com/title/tt0113247/	1995	https://www.youtube.com/watch?v=FKwcXt3JIaU&opi=89978449	1689603706754-314804857-LaHainePoster_1024x1024@2x.jpg
9bf33e9c-19e6-4c95-8cc2-4fb87d033165	Titanic	https://www.imdb.com/title/tt0120338/	1997	https://www.youtube.com/watch?v=I7c1etV7D7g	1689603893708-818883483-5401027_so.jpg
523f9364-67a3-462d-bdc8-1b9e29e60f92	The Godfather	https://www.imdb.com/title/tt0068646/	1972	https://www.youtube.com/watch?v=UaVTIH8mujA	1689604035726-907478832-MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg
3fe445e6-9ab0-4ec3-a4c3-a233072aa333	Oppenheimer	https://www.imdb.com/title/tt15398776/	2023	https://www.youtube.com/watch?v=uYPbbksJxIg	1689970619126-982387025-OppenheimerOfficialPoster.webp
\.


--
-- TOC entry 3693 (class 0 OID 16644)
-- Dependencies: 219
-- Data for Name: pers; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.pers (pers_id, pers_fn, pers_ln, pers_imdb, pers_img) FROM stdin;
39b26dfe-6310-42d6-b519-333332c44e81	Brad	Pitt	https://www.imdb.com/name/nm0000093/	1689604105992-833453527-1366_v9_bc.jpg
b9f7ed8d-6b54-41fa-9a2c-4cf56ebf8826	Edward	Norton	https://www.imdb.com/name/nm0001570	1689604363031-348902511-Ed_Norton_Shankbone_Metropolitan_Opera_2009.jpg
1fe2336a-3e79-4873-9424-b5eb43a37dc0	Jared	Leto	https://www.imdb.com/name/nm0001467	1689604382970-186101751-Jared_Leto,_San_Diego_Comic_Con_2016_(2)_(cropped).jpg
5bfeb963-beca-4b4f-a2ba-9579e87e59d5	Helena	Bonham Carter	https://www.imdb.com/name/nm0000307	1689604414761-763770307-Helena_Bonham_Carter_2011_AA.jpg
3c3b82f6-6e75-4e3d-87cd-36f6c6c03521	Art	Linson	https://www.imdb.com/name/nm0513165	1689604433458-728697698-_315x420_e8d59809c27beed65fa85725930c7d7e480f8884beb164a2fdefb4dd116e63a3.jpg
208ba975-e9c3-4a69-b891-2a4c99a221d6	David	Fincher	https://www.imdb.com/name/nm0000399	1689604454999-274971515-David_Fincher_2010_New_York_Film_Festival_-_02_(cropped).jpg
3218351f-dd07-4473-bca9-66cb223317f2	Vincent	Cassel	https://www.imdb.com/name/nm0001993	1689605341741-294414248-440px-Vincent_Cassel_le_moine.jpg
fceb9ccf-eebc-4ce9-b64b-56cc51d25619	Hubert	Koundé	https://www.imdb.com/name/nm0468003/	1689605357164-869339922-5065693.webp
28a4b08e-893b-449a-9708-8fa7de22bdbd	Mathieu	Kassovitz	https://www.imdb.com/name/nm0440913/	1689605398898-372318481-Mathieu_Kassovitz_Cannes_2017.jpg
c6882935-b94a-456a-9107-d418ab815622	Francis	Ford Copolla	https://www.imdb.com/name/nm0000338/	1689606005600-629654479-Francis_Ford_Coppola_2011_CC.jpg
dc77917e-df54-4a26-bcb3-78050d8a33ce	Albert	S. Ruddy	https://www.imdb.com/name/nm0748665	1689606025411-716641956-AlbertSRuddy.webp
b672ce72-7906-4c25-a3ed-42c8f8ac0154	Diane	Keaton	https://www.imdb.com/name/nm0000473	1689606042683-203040260-Diane_Keaton_2012-1_(cropped).jpg
67971b7e-bc5f-484b-bf7e-1cb5c11c2cdc	Marlon	Brando	https://www.imdb.com/name/nm0000008	1689606058919-321708064-Marlon_Brando_publicity_for_One-Eyed_Jacks.png
dc78a288-5bf0-4cec-99c8-d3c699ccf2db	Al	Pacino	https://www.imdb.com/name/nm0000199	1689606075537-111433326-ra722.webp
a6438e68-2164-406a-aaab-c2c92cfc00c1	James	Cameron	https://www.imdb.com/name/nm0000116/	1689607472233-614943638-unf8o6see6wip8v5fsci.jpeg
9d7a827d-06ab-48d3-969d-ca13ca60f475	Leonardo	DiCaprio	https://www.imdb.com/name/nm0000138	1689607520931-718279157-American-actor-Leonardo-DiCaprio-2016.webp
41458e69-b033-47e7-9a8f-d70070e025dd	Kate	Winslet	https://www.imdb.com/name/nm0000701	1689607570554-791169986-MV5BODgzMzM2NTE0Ml5BMl5BanBnXkFtZTcwMTcyMTkyOQ@@._V1_FMjpg_UX1000_.jpg
8fde17d8-5aad-44a0-b958-7a62cdb7dc21	Billy	Zane	https://www.imdb.com/name/nm0000708/	1689607613794-222665699-B.jpeg
c0d72054-5054-44e9-8d28-cadac4c1f6e0	Christopher	Rossignon	https://www.imdb.com/name/nm0744384/	1689605423634-403773415-christophe-rossignon.jpg
\.


--
-- TOC entry 3700 (class 0 OID 16689)
-- Dependencies: 226
-- Data for Name: pers_movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.pers_movie (pm_pers_id, pm_movie_id, role) FROM stdin;
39b26dfe-6310-42d6-b519-333332c44e81	3889d85e-2897-441c-b6f5-6a11f9bcb083	0
b9f7ed8d-6b54-41fa-9a2c-4cf56ebf8826	3889d85e-2897-441c-b6f5-6a11f9bcb083	0
5bfeb963-beca-4b4f-a2ba-9579e87e59d5	3889d85e-2897-441c-b6f5-6a11f9bcb083	0
1fe2336a-3e79-4873-9424-b5eb43a37dc0	3889d85e-2897-441c-b6f5-6a11f9bcb083	0
3c3b82f6-6e75-4e3d-87cd-36f6c6c03521	3889d85e-2897-441c-b6f5-6a11f9bcb083	1
208ba975-e9c3-4a69-b891-2a4c99a221d6	3889d85e-2897-441c-b6f5-6a11f9bcb083	2
fceb9ccf-eebc-4ce9-b64b-56cc51d25619	976dedaa-06ba-4425-8a59-9585fba7c1bf	0
3218351f-dd07-4473-bca9-66cb223317f2	976dedaa-06ba-4425-8a59-9585fba7c1bf	0
c0d72054-5054-44e9-8d28-cadac4c1f6e0	976dedaa-06ba-4425-8a59-9585fba7c1bf	1
28a4b08e-893b-449a-9708-8fa7de22bdbd	976dedaa-06ba-4425-8a59-9585fba7c1bf	2
8fde17d8-5aad-44a0-b958-7a62cdb7dc21	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	0
9d7a827d-06ab-48d3-969d-ca13ca60f475	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	0
41458e69-b033-47e7-9a8f-d70070e025dd	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	0
a6438e68-2164-406a-aaab-c2c92cfc00c1	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	1
a6438e68-2164-406a-aaab-c2c92cfc00c1	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	2
b672ce72-7906-4c25-a3ed-42c8f8ac0154	523f9364-67a3-462d-bdc8-1b9e29e60f92	0
67971b7e-bc5f-484b-bf7e-1cb5c11c2cdc	523f9364-67a3-462d-bdc8-1b9e29e60f92	0
dc78a288-5bf0-4cec-99c8-d3c699ccf2db	523f9364-67a3-462d-bdc8-1b9e29e60f92	0
dc77917e-df54-4a26-bcb3-78050d8a33ce	523f9364-67a3-462d-bdc8-1b9e29e60f92	1
c6882935-b94a-456a-9107-d418ab815622	523f9364-67a3-462d-bdc8-1b9e29e60f92	2
\.


--
-- TOC entry 3699 (class 0 OID 16681)
-- Dependencies: 225
-- Data for Name: rating; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.rating (rating_user_id, rating_movie_id, rating, "time") FROM stdin;
4079f373-60bc-4bb8-be31-8440aae3a507	523f9364-67a3-462d-bdc8-1b9e29e60f92	5	14:53:17.20882+02
4079f373-60bc-4bb8-be31-8440aae3a507	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	3.5	14:53:21.347734+02
5dcf069e-68e5-45ed-ae0c-554102116712	3889d85e-2897-441c-b6f5-6a11f9bcb083	4.5	18:47:51.78711+02
fab9d566-d077-45fc-8748-6e5fa5d2917c	3889d85e-2897-441c-b6f5-6a11f9bcb083	5	21:47:35.198986+02
5dcf069e-68e5-45ed-ae0c-554102116712	523f9364-67a3-462d-bdc8-1b9e29e60f92	5	15:29:43.800478+02
5dcf069e-68e5-45ed-ae0c-554102116712	976dedaa-06ba-4425-8a59-9585fba7c1bf	5	15:36:58.112177+02
fab9d566-d077-45fc-8748-6e5fa5d2917c	523f9364-67a3-462d-bdc8-1b9e29e60f92	5	15:41:16.139+02
\.


--
-- TOC entry 3692 (class 0 OID 16621)
-- Dependencies: 218
-- Data for Name: serv; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.serv (serv_id, serv_name) FROM stdin;
b627f08f-a114-4e3b-abcb-30294ef3cda7	Amazon Prime
fc4fb4c0-50ef-43c2-adb5-ec4780b0301d	Disney+
9f1fec75-3c64-4b02-9d12-1ddb71248cab	Hulu
90adb140-d631-4ee4-a694-6a97fec442ee	HBO Max
3ccee732-1130-4f5f-b97b-f64bff0f962d	Netflix
\.


--
-- TOC entry 3702 (class 0 OID 16699)
-- Dependencies: 228
-- Data for Name: serv_movie; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.serv_movie (sm_service_id, sm_movie_id) FROM stdin;
9f1fec75-3c64-4b02-9d12-1ddb71248cab	976dedaa-06ba-4425-8a59-9585fba7c1bf
90adb140-d631-4ee4-a694-6a97fec442ee	976dedaa-06ba-4425-8a59-9585fba7c1bf
fc4fb4c0-50ef-43c2-adb5-ec4780b0301d	9bf33e9c-19e6-4c95-8cc2-4fb87d033165
b627f08f-a114-4e3b-abcb-30294ef3cda7	523f9364-67a3-462d-bdc8-1b9e29e60f92
90adb140-d631-4ee4-a694-6a97fec442ee	523f9364-67a3-462d-bdc8-1b9e29e60f92
b627f08f-a114-4e3b-abcb-30294ef3cda7	3889d85e-2897-441c-b6f5-6a11f9bcb083
\.


--
-- TOC entry 3695 (class 0 OID 16656)
-- Dependencies: 221
-- Data for Name: usr; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.usr (usr_id, usr_name, usr_mail, usr_passhash, usr_img, usr_role) FROM stdin;
5dcf069e-68e5-45ed-ae0c-554102116712	user3	user3	$2b$12$QdJ5cbWnkG815sTbExtl3uWgKldKvgb/y/5p1HRNPx8ZKbfx/YgYm	user.jpg	0
ba6b2837-cfc2-4260-9d70-8cd2ce38745f	user2	user2	$2b$12$FWuuSDCif1rlk6dOIeV/y.ila0AbSzSRAJhbw0BIq22.WeaFjCUGy	1689943899533-604985324-Bonnet_macaque_(Macaca_radiata)_Photograph_By_Shantanu_Kuveskar.jpg	0
4079f373-60bc-4bb8-be31-8440aae3a507	user1	user1	$2b$12$j./Z3qGfNoLgdO0f63mc5.r2PJYs1J5.bAUw2uYC04lgjtWSdNstC	1689943884214-269210373-1920px-SNice.svg.png	0
fab9d566-d077-45fc-8748-6e5fa5d2917c	admin	admin	$2b$12$Yjms53.wOdWrYqzftiFWqu.s.etisThzadzOMQnqCak1wvRsFtAg6	user.jpg	1
\.


--
-- TOC entry 3698 (class 0 OID 16675)
-- Dependencies: 224
-- Data for Name: watched; Type: TABLE DATA; Schema: moviez; Owner: postgres
--

COPY moviez.watched (watched_user_id, watched_movie_id, watched_time) FROM stdin;
fab9d566-d077-45fc-8748-6e5fa5d2917c	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	2023-07-21 21:43:20.867278+02
fab9d566-d077-45fc-8748-6e5fa5d2917c	3889d85e-2897-441c-b6f5-6a11f9bcb083	2023-07-21 21:47:30.900108+02
5dcf069e-68e5-45ed-ae0c-554102116712	9bf33e9c-19e6-4c95-8cc2-4fb87d033165	2023-07-18 02:16:41.498626+02
5dcf069e-68e5-45ed-ae0c-554102116712	3889d85e-2897-441c-b6f5-6a11f9bcb083	2023-07-18 14:28:58.536951+02
5dcf069e-68e5-45ed-ae0c-554102116712	523f9364-67a3-462d-bdc8-1b9e29e60f92	2023-07-18 15:29:47.106521+02
fab9d566-d077-45fc-8748-6e5fa5d2917c	523f9364-67a3-462d-bdc8-1b9e29e60f92	2023-07-20 16:21:47.949445+02
4079f373-60bc-4bb8-be31-8440aae3a507	523f9364-67a3-462d-bdc8-1b9e29e60f92	2023-07-21 14:53:15.55512+02
\.


--
-- TOC entry 3528 (class 2606 OID 16698)
-- Name: genre_movie genre_movie_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.genre_movie
    ADD CONSTRAINT genre_movie_pkey PRIMARY KEY (gm_genre_id, gm_movie_id);


--
-- TOC entry 3502 (class 2606 OID 16615)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (genre_id);


--
-- TOC entry 3532 (class 2606 OID 16708)
-- Name: lang_movie lang_movie_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lang_movie
    ADD CONSTRAINT lang_movie_pkey PRIMARY KEY (lm_lang_id, lm_movie_id);


--
-- TOC entry 3504 (class 2606 OID 16620)
-- Name: lang lang_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lang
    ADD CONSTRAINT lang_pkey PRIMARY KEY (lang_id);


--
-- TOC entry 3520 (class 2606 OID 16673)
-- Name: lst_movie lst_movie_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lst_movie
    ADD CONSTRAINT lst_movie_pkey PRIMARY KEY (lst_id, movie_id);


--
-- TOC entry 3518 (class 2606 OID 16668)
-- Name: lst lst_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lst
    ADD CONSTRAINT lst_pkey PRIMARY KEY (lst_id);


--
-- TOC entry 3510 (class 2606 OID 16654)
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (movie_id);


--
-- TOC entry 3526 (class 2606 OID 16851)
-- Name: pers_movie pers_movie_pk; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.pers_movie
    ADD CONSTRAINT pers_movie_pk PRIMARY KEY (pm_pers_id, pm_movie_id, role);


--
-- TOC entry 3508 (class 2606 OID 16649)
-- Name: pers pers_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.pers
    ADD CONSTRAINT pers_pkey PRIMARY KEY (pers_id);


--
-- TOC entry 3524 (class 2606 OID 16688)
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (rating_user_id, rating_movie_id);


--
-- TOC entry 3530 (class 2606 OID 16703)
-- Name: serv_movie serv_movie_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.serv_movie
    ADD CONSTRAINT serv_movie_pkey PRIMARY KEY (sm_service_id, sm_movie_id);


--
-- TOC entry 3506 (class 2606 OID 16625)
-- Name: serv serv_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.serv
    ADD CONSTRAINT serv_pkey PRIMARY KEY (serv_id);


--
-- TOC entry 3512 (class 2606 OID 16847)
-- Name: usr uq_mail; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.usr
    ADD CONSTRAINT uq_mail UNIQUE (usr_mail);


--
-- TOC entry 3514 (class 2606 OID 16845)
-- Name: usr uq_usr; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.usr
    ADD CONSTRAINT uq_usr UNIQUE (usr_name);


--
-- TOC entry 3516 (class 2606 OID 16662)
-- Name: usr usr_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (usr_id);


--
-- TOC entry 3522 (class 2606 OID 16680)
-- Name: watched watched_pkey; Type: CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.watched
    ADD CONSTRAINT watched_pkey PRIMARY KEY (watched_user_id, watched_movie_id);


--
-- TOC entry 3542 (class 2606 OID 16709)
-- Name: genre_movie gm_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.genre_movie
    ADD CONSTRAINT gm_fk1 FOREIGN KEY (gm_genre_id) REFERENCES moviez.genre(genre_id) NOT VALID;


--
-- TOC entry 3543 (class 2606 OID 16714)
-- Name: genre_movie gm_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.genre_movie
    ADD CONSTRAINT gm_fk2 FOREIGN KEY (gm_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3546 (class 2606 OID 16719)
-- Name: lang_movie lm_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lang_movie
    ADD CONSTRAINT lm_fk1 FOREIGN KEY (lm_lang_id) REFERENCES moviez.lang(lang_id) NOT VALID;


--
-- TOC entry 3547 (class 2606 OID 16724)
-- Name: lang_movie lm_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lang_movie
    ADD CONSTRAINT lm_fk2 FOREIGN KEY (lm_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3533 (class 2606 OID 16729)
-- Name: lst lst_fk; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lst
    ADD CONSTRAINT lst_fk FOREIGN KEY (lst_usr_id) REFERENCES moviez.usr(usr_id) NOT VALID;


--
-- TOC entry 3534 (class 2606 OID 16734)
-- Name: lst_movie lstm_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lst_movie
    ADD CONSTRAINT lstm_fk1 FOREIGN KEY (lst_id) REFERENCES moviez.lst(lst_id) NOT VALID;


--
-- TOC entry 3535 (class 2606 OID 16739)
-- Name: lst_movie lstm_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.lst_movie
    ADD CONSTRAINT lstm_fk2 FOREIGN KEY (movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3540 (class 2606 OID 16744)
-- Name: pers_movie pm_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.pers_movie
    ADD CONSTRAINT pm_fk1 FOREIGN KEY (pm_pers_id) REFERENCES moviez.pers(pers_id) NOT VALID;


--
-- TOC entry 3541 (class 2606 OID 16749)
-- Name: pers_movie pm_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.pers_movie
    ADD CONSTRAINT pm_fk2 FOREIGN KEY (pm_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3538 (class 2606 OID 16754)
-- Name: rating rating_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.rating
    ADD CONSTRAINT rating_fk1 FOREIGN KEY (rating_user_id) REFERENCES moviez.usr(usr_id) NOT VALID;


--
-- TOC entry 3539 (class 2606 OID 16759)
-- Name: rating rating_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.rating
    ADD CONSTRAINT rating_fk2 FOREIGN KEY (rating_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3544 (class 2606 OID 16764)
-- Name: serv_movie sm_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.serv_movie
    ADD CONSTRAINT sm_fk1 FOREIGN KEY (sm_service_id) REFERENCES moviez.serv(serv_id) NOT VALID;


--
-- TOC entry 3545 (class 2606 OID 16769)
-- Name: serv_movie sm_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.serv_movie
    ADD CONSTRAINT sm_fk2 FOREIGN KEY (sm_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


--
-- TOC entry 3536 (class 2606 OID 16779)
-- Name: watched watched_fk1; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.watched
    ADD CONSTRAINT watched_fk1 FOREIGN KEY (watched_user_id) REFERENCES moviez.usr(usr_id) NOT VALID;


--
-- TOC entry 3537 (class 2606 OID 16784)
-- Name: watched watched_fk2; Type: FK CONSTRAINT; Schema: moviez; Owner: postgres
--

ALTER TABLE ONLY moviez.watched
    ADD CONSTRAINT watched_fk2 FOREIGN KEY (watched_movie_id) REFERENCES moviez.movie(movie_id) NOT VALID;


-- Completed on 2023-07-22 00:25:18 CEST

--
-- PostgreSQL database dump complete
--

