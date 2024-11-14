--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Homebrew)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: skitour_database_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO skitour_database_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BucketList; Type: TABLE; Schema: public; Owner: skitour_database_user
--

CREATE TABLE public."BucketList" (
    id integer NOT NULL,
    "mountainId" integer NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."BucketList" OWNER TO skitour_database_user;

--
-- Name: BucketList_id_seq; Type: SEQUENCE; Schema: public; Owner: skitour_database_user
--

CREATE SEQUENCE public."BucketList_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BucketList_id_seq" OWNER TO skitour_database_user;

--
-- Name: BucketList_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skitour_database_user
--

ALTER SEQUENCE public."BucketList_id_seq" OWNED BY public."BucketList".id;


--
-- Name: Mountain; Type: TABLE; Schema: public; Owner: skitour_database_user
--

CREATE TABLE public."Mountain" (
    id integer NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    picture text NOT NULL,
    "passType" text NOT NULL,
    region text NOT NULL
);


ALTER TABLE public."Mountain" OWNER TO skitour_database_user;

--
-- Name: Mountain_id_seq; Type: SEQUENCE; Schema: public; Owner: skitour_database_user
--

CREATE SEQUENCE public."Mountain_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Mountain_id_seq" OWNER TO skitour_database_user;

--
-- Name: Mountain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skitour_database_user
--

ALTER SEQUENCE public."Mountain_id_seq" OWNED BY public."Mountain".id;


--
-- Name: ReviewItem; Type: TABLE; Schema: public; Owner: skitour_database_user
--

CREATE TABLE public."ReviewItem" (
    id integer NOT NULL,
    title character varying(500) NOT NULL,
    rating integer NOT NULL,
    "authorId" integer NOT NULL,
    "mountainId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL
);


ALTER TABLE public."ReviewItem" OWNER TO skitour_database_user;

--
-- Name: ReviewItem_id_seq; Type: SEQUENCE; Schema: public; Owner: skitour_database_user
--

CREATE SEQUENCE public."ReviewItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReviewItem_id_seq" OWNER TO skitour_database_user;

--
-- Name: ReviewItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skitour_database_user
--

ALTER SEQUENCE public."ReviewItem_id_seq" OWNED BY public."ReviewItem".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: skitour_database_user
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "auth0Id" text DEFAULT ''::text NOT NULL,
    name text NOT NULL,
    "skierType" text,
    "skierLevel" text
);


ALTER TABLE public."User" OWNER TO skitour_database_user;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: skitour_database_user
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO skitour_database_user;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: skitour_database_user
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: BucketList id; Type: DEFAULT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."BucketList" ALTER COLUMN id SET DEFAULT nextval('public."BucketList_id_seq"'::regclass);


--
-- Name: Mountain id; Type: DEFAULT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."Mountain" ALTER COLUMN id SET DEFAULT nextval('public."Mountain_id_seq"'::regclass);


--
-- Name: ReviewItem id; Type: DEFAULT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."ReviewItem" ALTER COLUMN id SET DEFAULT nextval('public."ReviewItem_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: BucketList; Type: TABLE DATA; Schema: public; Owner: skitour_database_user
--

COPY public."BucketList" (id, "mountainId", "authorId") FROM stdin;
23	51	13
24	3	13
26	53	13
27	32	13
1	60	13
2	68	1
3	46	7
4	12	8
7	49	12
9	3	16
12	22	18
14	34	19
15	20	13
18	12	13
\.


--
-- Data for Name: Mountain; Type: TABLE DATA; Schema: public; Owner: skitour_database_user
--

COPY public."Mountain" (id, name, location, picture, "passType", region) FROM stdin;
2	Big Bear	Big Bear Lake, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/BigBear.jpg?alt=media&token=95c5dc27-fb6c-444c-bf53-05f2469b556d	Ikon	West
4	Blue Mountain	Blue Mountain, Ontario, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/BlueMountain.jpeg?alt=media&token=e97946c7-f628-424d-969f-c1c39eec8d39	Ikon	Canada
6	Brighton	Brighton, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Brighton.jpg?alt=media&token=83061519-d81c-42f3-972a-78437df9b158	Ikon	Rockies
8	Coronet Peak, The Remarkables, Mount Hutt	Coronet Peak, New Zealand	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/CoronetRemarksHutt.jpg?alt=media&token=c4517e83-cdfc-4b3b-95f5-802303e0a5bf	Ikon	Oceania
10	Cypress	West Vancouver, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Cypress.jpg?alt=media&token=c831ed59-6402-452e-b6ba-a9661cca1027	Ikon	Canada
12	Dolomiti Superski	Passua, Italy	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/DolomitiSuperski.jpg?alt=media&token=facca73f-37a2-420d-a245-6151c804eaa7	Ikon	Europe
13	Eldora	Nederland, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Eldora.jpeg?alt=media&token=208aef85-b40e-49cd-92ca-c2d562df032c	Ikon	Rockies
15	June Mountain	June Lake, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/JuneMountain.jpg?alt=media&token=07c74de0-8aaf-4e30-a488-fda8cf62a0d1	Ikon	West
17	Kitzbuhel	Innsbruck, Austria	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Kitzbuhel.jpg?alt=media&token=cb870381-25e5-4017-9eee-56547e024eea	Ikon	Europe
19	Niseko United	Niseko, Japan	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/NisekoUnited.jpg?alt=media&token=694c0dd5-9d21-4b6a-beb7-c6cee696f107	Ikon	Asia
21	SkiBig3	Lake Louise, Alberta, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SkiBig3.jpg?alt=media&token=a1a66bc0-bf54-45d4-807a-b70abc7452d4	Ikon	Canada
23	Snowbird	Snowbird, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Snowbird.jpg?alt=media&token=31c22e34-25a7-4c07-8dba-3f50d6068e37	Ikon	Rockies
24	Solitude	Solitude, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Solitude.jpg?alt=media&token=65c62a62-ad08-4dbb-b511-db31a9313b8b	Ikon	Rockies
26	Sugarbush	Warren, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Sugarbush.jpeg?alt=media&token=c5597c3d-0b87-49eb-8c3e-e500e7c62868	Ikon	Northeast
28	Sunday River	Newry, Maine	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SundayRiver.jpg?alt=media&token=9ad35231-e7c4-4e01-b54b-8cf379ef571c	Ikon	Northeast
29	Thredbo	Thredo, Australia	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Thredbo.jpg?alt=media&token=c9ef1bd3-7c56-41e4-9680-ac810e266496	Ikon	Oceania
31	Winter Park	Winter Park, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/WinterPark.jpg?alt=media&token=6a872c85-f856-4f20-bbfe-2d4a9364d5a3	Ikon	Rockies
33	Aleyska	Girdwood, Alaska	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Aleyska.jpg?alt=media&token=5ec762f0-89b1-429e-8b4e-7fee9d90d671	Ikon	West
35	Chamonix Mont-Blanc Valley	Chamonix-Mont-Blanc, France	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Chamonix.jpg?alt=media&token=e18fd0e7-6ce1-4af9-b46a-45220c927736	Ikon	Europe
37	Mount Bachelor	Bend, Oregon	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/MountBachelor.jpg?alt=media&token=29358a7c-5e8e-4080-8842-24f895e23a94	Ikon	West
38	Panorama	Panorama, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Panorama.jpg?alt=media&token=f0b749e6-1284-45b0-8fcc-620225aef0a3	Ikon	Canada
40	Schweitzer	Sandpoint, Idaho	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Schweitzer.jpg?alt=media&token=3ed114fb-58d6-4bd0-8bdc-63e8eac742c8	Ikon	West
42	Snow Valley	Running Springs, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SnowValley.jpg?alt=media&token=c582c26c-778b-4f65-b839-59e1bcfbaa60	Ikon	West
44	Sun Peaks	Sun Peaks, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SunPeaks.jpg?alt=media&token=d2bdf52f-f3fc-4264-899e-9f82ca2b653d	Ikon	Canada
45	Sun Valley	Sun Valley, Idaho	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SunValley.jpg?alt=media&token=9c2d1c6b-b8e6-43c1-a906-442377c98f7a	Ikon	West
48	Windham	Windham, New York	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Windham.jpg?alt=media&token=1b13fc05-a7d4-4dd1-a967-cb6d4f2f98fa	Ikon	Mid-Atlantic
49	Steamboat	Steamboat Springs, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Steamboat.jpg?alt=media&token=61115cd3-70de-4645-a568-7306a78e2bc8	Ikon	Rockies
52	Aspen	Aspen, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Aspen.jpg?alt=media&token=d5b8ac32-a7af-42c7-b080-9ca0eedebacb	Ikon	Rockies
53	Palisades	Olympic Valley, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Palisades.jpg?alt=media&token=06efdfb4-4c7a-4764-80a2-aeb0253d4598	Ikon	West
55	Vail	Vail, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Vail.jpeg?alt=media&token=cdf69bf3-9434-4a0a-a4f0-c68f28ece13f	Epic	Rockies
57	Breckenridge	Breckenridge, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Breckenridge.jpeg?alt=media&token=8e1edef4-7c62-4b40-aaa2-0538a61ce6c3	Epic	Rockies
59	Crested Butte	Crested Butte, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/CrestedButte.jpg?alt=media&token=923beabe-953f-4448-bbe6-e9a5cafa9fd8	Epic	Rockies
61	Heavenly	South Lake Tahoe, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Heavenly.jpg?alt=media&token=ea0949d2-d49b-4286-9271-3ff1a902097d	Epic	West
62	Kirkwood	Kirkwood, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Kirkwood.jpg?alt=media&token=6b6b2540-65da-461d-9871-9317c1a56267	Epic	West
1	Arai	Myoko, Japan	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Arai.jpg?alt=media&token=19011062-b067-48a1-9249-9567e62e3c7d	Ikon	Asia
3	Big Sky	Big Sky, Montana	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/BigSky.jpg?alt=media&token=0f83b18d-02e4-4161-9cd4-210369eb9cdd	Ikon	Rockies
5	Boyne	Boyne Falls, Michigan	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Boyne.jpg?alt=media&token=fc8e7958-fe60-4ff5-9ccc-a85d7d6eab32	Ikon	Midwest
7	Mount Buller	Mount Buller, Australia	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Buller.jpg?alt=media&token=ae65da6b-70d4-4dc0-b0b0-260b934da684	Ikon	Oceania
9	Crystal Mountain	Enumclaw, Washington	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/CrystalMountain.jpeg?alt=media&token=63d0790b-5a75-4b58-9062-091b129b744c	Ikon	West
11	Deer Valley	Park City, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/DeerValley.jpg?alt=media&token=abd00cdd-a147-4192-8fb2-b6cae715bdae	Ikon	Rockies
14	The Highlands	Harbor Springs, Michigan	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Highlands.jpeg?alt=media&token=95d1b9f8-138b-499b-804c-bab9ec1ff4c4	Ikon	Midwest
16	Killington-Pico	Killington, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Killington.jpg?alt=media&token=c1c8096f-8431-435b-ae41-eae07e034e74	Ikon	Northeast
18	Loon	Lincoln, New Hampshire	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Loon.jpg?alt=media&token=ae4f73db-46bb-44e0-8539-ea34a468db29	Ikon	Northeast
20	Revelstoke	Revelstoke, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Revelstoke.jpg?alt=media&token=5ebec6c1-0a64-4d4b-b530-8e42d2459404	Ikon	Canada
22	The Summit At Snoqualmie	Snoqualmie Pass, Washington	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Snoqualmie.jpg?alt=media&token=81cdc5d4-a179-47b3-8bbb-9307575e09a0	Ikon	West
25	Stratton	Stratton Mountain, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Stratton.jpg?alt=media&token=b76ec51d-f8bc-44fd-a22c-58bc45d0bdb8	Ikon	Northeast
27	Sugarloaf	Wilton, Maine	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Sugarloaf.jpg?alt=media&token=88d95bbe-e405-4fb5-9136-6a25670b8c25	Ikon	Northeast
30	Tremblant	Mont-Tremblant, Quebec, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Tremblant.jpg?alt=media&token=9a5f43c5-ded9-4b19-8236-653f0aa6c494	Ikon	Canada
32	Zermatt	Zermatt, Switzerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Zermatt.jpg?alt=media&token=cbe4d1dc-a6b7-4859-a229-feb812600b43	Ikon	Europe
65	Whistler Blackcomb	Whistler, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Whistler.jpeg?alt=media&token=680c501d-4bb6-41ef-86d8-493f786d221d	Epic	Canada
67	Attitash	Bartlett, New Hampshire	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Attitash.jpg?alt=media&token=220c186e-cec3-4da1-b9e5-9472da9afd50	Epic	Northeast
69	Crotched	Bennington, New Hampshire	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/CrotchedMountain.jpeg?alt=media&token=94d7b0c8-17e0-4e3c-8835-7d44c9ff37ab	Epic	Northeast
71	Hunter	Hunter, New York	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/HunterMountain.jpg?alt=media&token=05762687-8639-44a5-a52b-29c3096eedc7	Epic	Northeast
73	Mount Sunapee	Newbury, New Hampshire	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/MountSunapee.jpg?alt=media&token=b0665566-bb92-4cc2-897f-cff207978d23	Epic	Northeast
74	Seven Springs	Seven Springs, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SevenSprings.jpg?alt=media&token=ce3e285c-2228-40dc-a3f1-999f62728991	Epic	Mid-Atlantic
76	Liberty Mountain	Fairfield, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/LibertyMountain.jpg?alt=media&token=44b1c6c2-883a-4c7c-afa6-267d3a2ba5f0	Epic	Mid-Atlantic
78	Jack Frost	White Haven, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/JackFrost.jpg?alt=media&token=b233f3db-7e91-455a-8863-9c7837977df2	Epic	Mid-Atlantic
79	Roundtop	Lewisberry, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Roundtop.jpg?alt=media&token=5260f18b-f82d-44d2-9e56-59339336da0e	Epic	Mid-Atlantic
81	Afton Alps	Hastings, Minnesota	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/AftonAlps.jpeg?alt=media&token=8b98b8e6-3b0b-49fa-a50d-87ac17548f53	Epic	Midwest
83	Mad River Mountain	Zanesfield, Ohio	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/MadRiver.jpeg?alt=media&token=33af93b4-cfce-4360-8f2a-0d7b6b069847	Epic	Midwest
85	Alpine Valley	Elkhorn, Wisconsin	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/AlpineValley.jpeg?alt=media&token=9dfeaf34-4a6f-4652-8cc0-447a826d8c20	Epic	Midwest
87	Boston Mills	Peninsula, Ohio	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/BostonMills.jpeg?alt=media&token=dd9a6062-3b17-4ab5-83b9-10fc9bd01c98	Epic	Midwest
89	Paoli Peaks	Paoli, Indiana	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/PaoliPeaks.jpg?alt=media&token=3c90b1e3-cf12-41fb-8223-9f3e8485fded	Epic	Midwest
90	Perisher	Perisher Valley, Australia	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Perisher.jpg?alt=media&token=6c286f2c-e02f-4c81-85e1-ce1cd10eb450	Epic	Oceania
92	Hotham	Hotham Heights, Australia	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Hotham.jpeg?alt=media&token=60169f64-a4f5-4247-a652-0bfbd5e22a65	Epic	Oceania
94	Andermatt-Sedrun-Disentis	Andermatt, Switerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Andermatt.jpg?alt=media&token=da93347f-712d-48f4-ab63-e92b5cff5c1b	Epic	Europe
96	Skirama Dolimiti	Waldheim, Switzerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SkiramaDolomiti.jpg?alt=media&token=de4d471d-0487-4e7c-a5a8-ad0645bd8ea6	Epic	Europe
51	Jackson Hole	Jackson Hole, Wyoming	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/JacksonHole.jpg?alt=media&token=e3e78545-005c-4a4c-90bf-1996cc8514b0	Ikon	Rockies
34	Camelback	Tannersville, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Camelback.jpg?alt=media&token=8de93e3f-6001-4743-8365-0027bdbfc413	Ikon	Mid-Atlantic
36	Grandvalira Resorts Andorra	Canillo, Andorra	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Grandvalira.jpg?alt=media&token=607d7324-fb7b-4176-88d9-7f247117b341	Ikon	Europe
39	Red Mountain	Rossland, British Columbia, Canada	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/RedMountain.jpg?alt=media&token=48edae98-792b-449d-989b-0d4de92ba42a	Ikon	Canada
41	Snowbasin	Huntsville, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Snowbasin.jpg?alt=media&token=146b181e-5785-4863-a546-6e5845ab9ecc	Ikon	Rockies
43	Saint Moritz	Saint Moritz, Switzerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/StMoritz.jpg?alt=media&token=4edcc0c9-8cef-4191-b6d4-703f99b82a28	Ikon	Europe
46	Taos	Taos Ski Valley, New Mexico	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Taos.jpg?alt=media&token=7cfcc765-3c40-4795-ba0b-cd4000eb5360	Ikon	Rockies
47	Valle Nevado	Lo Barnechea, Santiago Metropolitan Region, Chile	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/ValleNevado.jpg?alt=media&token=ae70e9e6-cf7e-42a8-aab1-8bc46dc2ba65	Ikon	South America
50	Mammoth Mountain	Mammoth Lakes, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/MammothMountain.jpg?alt=media&token=a3cd20a3-a44d-4c3c-b93d-3e8096b924a1	Ikon	West
54	Copper Mountain	Copper Mountain, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/CopperMountain.jpg?alt=media&token=aecd4a97-2275-420b-bf20-9b878a3438f7	Ikon	Rockies
56	Beaver Creek	Beaver Creek, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/BeaverCreek.jpg?alt=media&token=5b61da2e-92e4-4d22-ae7f-746284e39422	Epic	Rockies
58	Keystone	Keystone, Colorado	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Keystone.jpeg?alt=media&token=d78c5091-b92f-4b87-a0a7-d6d732284b09	Epic	Rockies
60	Park City	Park City, Utah	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/ParkCity.jpg?alt=media&token=0fc95cf0-f1cc-4144-a969-6e1fbe797980	Epic	Rockies
63	Northstar	North Lake Tahoe, California	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Northstar.jpg?alt=media&token=426b3b5e-cb84-48f4-b44e-1f080987408f	Epic	West
64	Stevens Pass	Skykomish, Washington	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/StevensPass.jpeg?alt=media&token=6644bd64-5995-428c-a58e-8045ca0fdbda	Epic	West
66	Stowe	Stowe, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Stowe.jpg?alt=media&token=a1b48f5a-fff3-4bc9-9085-3d34d74177b9	Epic	Northeast
68	Okemo	Ludlow, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Okemo.jpg?alt=media&token=f0ec95d4-5250-49ba-9484-8ba1e2c2d2b9	Epic	Northeast
70	Wildcat	Gorham, New Hampshire	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Wildcat.jpg?alt=media&token=202cacd5-665c-4c93-97b2-05e026274bf1	Epic	Northeast
72	Mount Snow	West Dover, Vermont	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/MountSnow.jpeg?alt=media&token=16f8852d-ff3e-4afb-94e6-acd2cf2ceafc	Epic	Northeast
75	Laurel Mountain	Boswell, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/LaurelMountain.jpeg?alt=media&token=5ddeb58b-4c51-4f3c-95f3-b7a4563e9c6b	Epic	Mid-Atlantic
77	Hidden Valley PA	King of Prussia, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/HiddenValleyPenn.jpg?alt=media&token=e981e7c2-af34-4428-8cd6-5b9bc858ab8d	Epic	Mid-Atlantic
80	Whitetail	Mercersburg, Pennsylvania	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Whitetail.jpeg?alt=media&token=60fd2840-c95f-4a43-b4c6-745fcffbc615	Epic	Mid-Atlantic
82	Mount Brighton	Brighton, Michigan	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Brighton.jpg?alt=media&token=83061519-d81c-42f3-972a-78437df9b158	Epic	Midwest
84	Wilmot	Wilmot, Wisconsin	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/WilmotMountain.jpeg?alt=media&token=74185a1c-8acf-4688-9461-36326d32f1dc	Epic	Midwest
86	Snow Creek	Snow Creek, Missouri	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SnowCreek.jpeg?alt=media&token=7e655c23-4eaf-43fd-b00b-35d28c9f109b	Epic	Midwest
88	Hidden Valley MO	Eureka, Missouri	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/HiddenValleyMissouri.jpeg?alt=media&token=6a45761b-30bb-44d4-adf8-30120fe4b990	Epic	Midwest
91	Falls Creek	Victoria, Australia	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/FallsCreek.jpg?alt=media&token=bc5e37b4-1cc0-4b37-90e7-ee479e30151e	Epic	Oceania
93	Crans-Montana	Crans-Montant, Switzerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Crans-Montana.jpg?alt=media&token=427776a1-63d5-4db6-991a-de9e05af5540	Epic	Europe
95	Verbier	Verbier, Switzerland	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/Verbier4Val.jpg?alt=media&token=5030e1d0-c8f2-4286-a556-cd867ae13914	Epic	Europe
97	Arlberg	Saint Anton am Arlberg	https://firebasestorage.googleapis.com/v0/b/ski-tour-77d0f.appspot.com/o/SkiAlberg.jpg?alt=media&token=cd8bff9d-dc8a-44cc-a697-23cb2546ffef	Epic	Europe
\.


--
-- Data for Name: ReviewItem; Type: TABLE DATA; Schema: public; Owner: skitour_database_user
--

COPY public."ReviewItem" (id, title, rating, "authorId", "mountainId", "createdAt") FROM stdin;
24	Truly is the best mountain on the East coast. There is a wide range of trails that vary in difficulty which is amazing! The snow conditions still aren't the best, but that's expected for the East coast. A great mountain for those who live in the Northeast.	5	13	16	2024-08-08 03:28:30.528
25	One of my favorite mountains. The snow there is ridiculously good, and its hard to get tired of the mountain with all that it offers. Steamboat also has the best ski town by far	5	13	49	2024-08-08 03:30:00.924
26	It is a decent mountain... My biggest complaint is that a large portion of the mountain never gets touched by the sun, which just makes it all the more easy for ice to form.	3	13	26	2024-08-08 03:30:56.727
27	Loved this resort! A huge number of trails with great tree skiing near the bottom and a steep open area at the top. The bowls were nice as well.	5	13	50	2024-08-08 03:31:43.422
28	A good mountain if you want to go on a very quick and easy car ride from Boston. Not too many trails, but gets the job done and is a fun time, especially the more secluded right side of the mountain.	4	13	18	2024-08-08 03:32:45.392
29	By far the most difficult mountain I have ever skied, but also some of the most fun I have ever had skiing! Really want to make the hike up to the Highland bowl next time I am out there!	5	13	52	2024-08-08 03:33:49.651
30	An amazing mountain! Unfortunately didn't get to ski the back bowls because it was too early in the season when I went... but the front side was still great. The only complaint I would have is how expensive everything is in the village.	5	13	55	2024-08-08 03:35:01.409
31	My first mountain out West. The views from every slope were so gorgeous that they simply did not look real. Would really like to explore the mountain some more if I ever make it back out there.	5	13	61	2024-08-08 03:35:51.855
2	Very cool!	5	7	75	2024-08-08 20:51:03.495
3	Amazing views, good variety of slopes from shaky to extremely confident skiers, great restaurants around 	5	9	49	2024-08-09 01:39:34.696
4	Super expansive slopes and lots of options. Cool social and food scene as well!	5	11	65	2024-08-10 01:42:23.095
5	Decent elevation but slightly expensive for what's offered. Very close to nearby city Seattle which is a plus!	4	11	22	2024-08-10 01:44:01.384
6	Super beautiful view at the top but as friendly for beginners! Cool to visit in the summer as well for the gondola.	4	11	9	2024-08-10 01:45:24.585
7	It was a great experience.  	5	12	49	2024-08-10 02:45:00.5
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: skitour_database_user
--

COPY public."User" (id, email, "auth0Id", name, "skierType", "skierLevel") FROM stdin;
1	test@gmail.com	auth0|66b5137aac1845172f8286dc	Bobby	\N	\N
2	testemail@gmail.com	auth0|66b5241a761a807b44adc896	John	Ski	advanced
3	third@gmail.com	auth0|66b525bb9a5bdfcf602e8876	third@gmail.com	\N	\N
4	fourth@gmail.com	auth0|66b526ca423e2610bbe1987f	fourth@gmail.com	\N	\N
5	fifth@gmail.com	auth0|66b527b69a5bdfcf602e8b2a	fifth@gmail.com	\N	\N
6	sixth@gmail.com	auth0|66b528eb9a5bdfcf602e8caf	Test	Ski	intermediate
7	alimirzazadeham@gmail.com	auth0|66b52f88ac1845172f82ace9	Ali	Ski	intermediate
8	alikylapd@gmail.com	auth0|66b53142761a807b44add9ac	Ali	Ski	advanced
9	bixmay@yahoo.com	auth0|66b5710290439751efe4c0a8	Pirouz Daeihagh	Ski	intermediate
10	azardaeihagh@gmail.com	auth0|66b575e29a5bdfcf602ee790	Azar Daeehagh	Ski	advanced
11	aks812789@gmail.com	auth0|66b6c54bfe2778551152fa5d	Akshat	Ski	intermediate
12	mike.barn25@gmail.com	auth0|66b6d3bcfe27785511530651	Michael	Snowboard	advanced
14	alileopd1@yahoo.com	auth0|66b8e6d83f71e364e9bd4f2b	Ali	Snowboard	beginner
15	test1234@gmail.com	auth0|66b8e841ca4983f346c32411	Bob	Snowboard	beginner
16	test123@yahoo.com	auth0|66b8eba0fe27785511545717	Tom	Snowboard	advanced
17	testemail@yahoo.com	auth0|66b8f428f23fe4e81c0d8749	Test	Snowboard	intermediate
18	test23423@gmail.com	auth0|66b8f5d5278c82a92d0e5952	Tim	Snowboard	beginner
19	test123456@gmail.com	auth0|66b8f995ad17d03b156f2d7e	Tim	Ski	beginner
20	aliklapd@gmail.com	auth0|66b8e66f278c82a92d0e4c5b	Joe	Ski	beginner
21	tes12423@gmail.com	auth0|66bad815278c82a92d1032f7	Aram	Ski	intermediate
22	testeq@gmail.com	auth0|66d124e90d53c2a1e8658db9	John	Ski	beginner
13	adaeihagh@gmail.com	auth0|66b43ad984a78a8cdb644b15	Ali Daeihagh	Ski	advanced
23	testemail122344@gmail.com	auth0|67093bc44a53b4437cdd3339	Joey	Ski	advanced
\.


--
-- Name: BucketList_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skitour_database_user
--

SELECT pg_catalog.setval('public."BucketList_id_seq"', 19, true);


--
-- Name: Mountain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skitour_database_user
--

SELECT pg_catalog.setval('public."Mountain_id_seq"', 1, false);


--
-- Name: ReviewItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skitour_database_user
--

SELECT pg_catalog.setval('public."ReviewItem_id_seq"', 12, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: skitour_database_user
--

SELECT pg_catalog.setval('public."User_id_seq"', 23, true);


--
-- Name: BucketList BucketList_pkey; Type: CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_pkey" PRIMARY KEY (id);


--
-- Name: Mountain Mountain_pkey; Type: CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."Mountain"
    ADD CONSTRAINT "Mountain_pkey" PRIMARY KEY (id);


--
-- Name: ReviewItem ReviewItem_pkey; Type: CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."ReviewItem"
    ADD CONSTRAINT "ReviewItem_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Mountain_name_key; Type: INDEX; Schema: public; Owner: skitour_database_user
--

CREATE UNIQUE INDEX "Mountain_name_key" ON public."Mountain" USING btree (name);


--
-- Name: User_auth0Id_key; Type: INDEX; Schema: public; Owner: skitour_database_user
--

CREATE UNIQUE INDEX "User_auth0Id_key" ON public."User" USING btree ("auth0Id");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: skitour_database_user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: BucketList BucketList_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BucketList BucketList_mountainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES public."Mountain"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReviewItem ReviewItem_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."ReviewItem"
    ADD CONSTRAINT "ReviewItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReviewItem ReviewItem_mountainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: skitour_database_user
--

ALTER TABLE ONLY public."ReviewItem"
    ADD CONSTRAINT "ReviewItem_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES public."Mountain"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO skitour_database_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO skitour_database_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO skitour_database_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO skitour_database_user;


--
-- PostgreSQL database dump complete
--

