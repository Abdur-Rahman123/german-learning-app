import { mkdir, writeFile } from 'node:fs/promises';
import { expandedTopics } from './expanded-topics.mjs';

const units = [
  {id:'introductions',title:'Introductions & personal information',icon:'👋',storyTitle:'Rahman at a German university',words:[
    ['hallo','interjection','','','hello','হ্যালো'],['guten Morgen','phrase','','','good morning','সুপ্রভাত'],['heißen','verb','','','to be called','নাম হওয়া'],['der Name','noun','der','Namen','name','নাম'],['ich','pronoun','','','I','আমি'],['du','pronoun','','','you (informal)','তুমি'],['Sie','pronoun','','','you (formal)','আপনি'],['kommen','verb','','','to come','আসা'],['aus','preposition','','','from','থেকে'],['das Land','noun','das','Länder','country','দেশ'],
    ['Deutschland','proper noun','','','Germany','জার্মানি'],['Bangladesch','proper noun','','','Bangladesh','বাংলাদেশ'],['wohnen','verb','','','to live','বাস করা'],['die Stadt','noun','die','Städte','city','শহর'],['sprechen','verb','','','to speak','কথা বলা'],['Deutsch','noun','','','German','জার্মান ভাষা'],['Englisch','noun','','','English','ইংরেজি ভাষা'],['die Sprache','noun','die','Sprachen','language','ভাষা'],['lernen','verb','','','to learn','শেখা'],['verstehen','verb','','','to understand','বোঝা'],
    ['alt','adjective','','','old','বয়স্ক'],['das Jahr','noun','das','Jahre','year','বছর'],['arbeiten','verb','','','to work','কাজ করা'],['der Student','noun','der','Studenten','male student','ছাত্র'],['die Studentin','noun','die','Studentinnen','female student','ছাত্রী'],['die Universität','noun','die','Universitäten','university','বিশ্ববিদ্যালয়'],['die Familie','noun','die','Familien','family','পরিবার'],['der Beruf','noun','der','Berufe','occupation','পেশা'],['fragen','verb','','','to ask','জিজ্ঞাসা করা'],['antworten','verb','','','to answer','উত্তর দেওয়া']
  ]},
  {id:'supermarket',title:'Supermarket & food',icon:'🛒',storyTitle:'Rahman searches for rice and spices',words:[
    ['das Brot','noun','das','Brote','bread','রুটি'],['der Reis','noun','der','','rice','চাল'],['das Wasser','noun','das','','water','পানি'],['die Milch','noun','die','','milk','দুধ'],['das Gemüse','noun','das','','vegetables','সবজি'],['das Fleisch','noun','das','','meat','মাংস'],['der Apfel','noun','der','Äpfel','apple','আপেল'],['die Banane','noun','die','Bananen','banana','কলা'],['die Kartoffel','noun','die','Kartoffeln','potato','আলু'],['die Tomate','noun','die','Tomaten','tomato','টমেটো'],
    ['der Supermarkt','noun','der','Supermärkte','supermarket','সুপারমার্কেট'],['kaufen','verb','','','to buy','কেনা'],['suchen','verb','','','to look for','খোঁজা'],['finden','verb','','','to find','খুঁজে পাওয়া'],['brauchen','verb','','','to need','প্রয়োজন হওয়া'],['kosten','verb','','','to cost','দাম হওয়া'],['der Preis','noun','der','Preise','price','দাম'],['billig','adjective','','','cheap','সস্তা'],['teuer','adjective','','','expensive','দামি'],['das Kilo','noun','das','Kilos','kilogram','কিলোগ্রাম'],
    ['der Einkaufswagen','noun','der','Einkaufswagen','shopping cart','বাজারের ট্রলি'],['der Korb','noun','der','Körbe','basket','ঝুড়ি'],['die Kasse','noun','die','Kassen','checkout','ক্যাশ কাউন্টার'],['bezahlen','verb','','','to pay','পরিশোধ করা'],['bar','adverb','','','in cash','নগদে'],['die Karte','noun','die','Karten','card','কার্ড'],['die Tüte','noun','die','Tüten','bag','ব্যাগ'],['bitte','adverb','','','please','দয়া করে'],['danke','interjection','','','thank you','ধন্যবাদ'],['geöffnet','adjective','','','open','খোলা']
  ]},
  {id:'transport',title:'Station & transportation',icon:'🚆',storyTitle:'Rahman and the wrong platform',words:[
    ['der Zug','noun','der','Züge','train','ট্রেন'],['der Bahnhof','noun','der','Bahnhöfe','railway station','রেলস্টেশন'],['das Gleis','noun','das','Gleise','platform / track','প্ল্যাটফর্ম'],['die Fahrkarte','noun','die','Fahrkarten','ticket','টিকিট'],['der Bus','noun','der','Busse','bus','বাস'],['die Haltestelle','noun','die','Haltestellen','stop','স্টপেজ'],['warten','verb','','','to wait','অপেক্ষা করা'],['fahren','verb','','','to travel / drive','যাওয়া / চালানো'],['einsteigen','verb','','','to get in','ওঠা'],['aussteigen','verb','','','to get out','নামা'],
    ['ankommen','verb','','','to arrive','পৌঁছানো'],['abfahren','verb','','','to depart','ছেড়ে যাওয়া'],['verpassen','verb','','','to miss','মিস করা'],['die Verspätung','noun','die','Verspätungen','delay','বিলম্ব'],['pünktlich','adjective','','','on time','সময়মতো'],['spät','adjective','','','late','দেরি'],['früh','adjective','','','early','আগে'],['heute','adverb','','','today','আজ'],['morgen','adverb','','','tomorrow','আগামীকাল'],['die Minute','noun','die','Minuten','minute','মিনিট'],
    ['die Stunde','noun','die','Stunden','hour','ঘণ্টা'],['nach','preposition','','','to / after','দিকে / পরে'],['von','preposition','','','from','থেকে'],['umsteigen','verb','','','to change trains','ট্রেন বদলানো'],['direkt','adjective','','','direct','সরাসরি'],['zurück','adverb','','','back','ফিরে'],['links','adverb','','','left','বামে'],['rechts','adverb','','','right','ডানে'],['wo','adverb','','','where','কোথায়'],['wann','adverb','','','when','কখন']
  ]}
];

for(const topic of expandedTopics){
  units.push({id:topic.id,title:topic.title,icon:topic.icon,storyTitle:topic.title,words:topic.items.map(item=>{
    const match=item.german.match(/^(der|die|das)\s+/),article=match?.[1]||'';
    const type=item.type==='noun'?(article?'noun':'phrase'):item.type;
    return[item.german,type,article,'',item.english,''];
  })});
}

const safeWord = value => value.replace(/^(der|die|das) /,'');
const opposites={
  'hallo':'auf Wiedersehen','guten Morgen':'gute Nacht','ich':'du','du':'ich','Sie':'du','kommen':'gehen','aus':'nach','Deutschland':'Bangladesch','Bangladesch':'Deutschland','sprechen':'schweigen','lernen':'vergessen','verstehen':'nicht verstehen','alt':'jung','arbeiten':'Pause machen','fragen':'antworten','antworten':'fragen',
  'kaufen':'verkaufen','suchen':'finden','finden':'suchen','brauchen':'nicht brauchen','billig':'teuer','teuer':'billig','bar':'mit Karte','bitte':'danke','danke':'bitte','geöffnet':'geschlossen',
  'einsteigen':'aussteigen','aussteigen':'einsteigen','ankommen':'abfahren','abfahren':'ankommen','pünktlich':'spät','spät':'früh','früh':'spät','heute':'morgen','nach':'von','von':'nach','direkt':'mit Umstieg','zurück':'hin','links':'rechts','rechts':'links','wo':'hier','wann':'jetzt'
};
const contrastTranslations={
  'auf Wiedersehen':'goodbye','gute Nacht':'good night','nicht verstehen':'not to understand','jung':'young','Pause machen':'to take a break','verkaufen':'to sell','nicht brauchen':'not to need','mit Karte':'by card','geschlossen':'closed','mit Umstieg':'with a transfer','hin':'there / outward','hier':'here','jetzt':'now','schweigen':'to be silent','vergessen':'to forget'
};
const verbExamples={
  'heißen':['Ich heiße Rahman.','Wie heißt du?','Sie heißt Anna.','Mein Bruder heißt Karim.','Wie heißen Sie?'],
  'kommen':['Ich komme aus Bangladesch.','Der Bus kommt um acht Uhr.','Kommst du heute?','Meine Freundin kommt später.','Wir kommen mit dem Zug.'],
  'wohnen':['Ich wohne in Berlin.','Wo wohnst du?','Wir wohnen zusammen.','Meine Familie wohnt in Dhaka.','Er wohnt neben der Universität.'],
  'sprechen':['Ich spreche ein bisschen Deutsch.','Sprichst du Englisch?','Wir sprechen heute über die Familie.','Bitte sprechen Sie langsam.','Sie spricht mit ihrer Lehrerin.'],
  'lernen':['Ich lerne jeden Tag Deutsch.','Wir lernen zehn neue Wörter.','Lernst du zu Hause?','Er lernt für die Prüfung.','Sie lernt schnell.'],
  'verstehen':['Ich verstehe die Frage.','Verstehst du mich?','Wir verstehen den Satz jetzt.','Ich verstehe nur ein bisschen Deutsch.','Sie versteht den Lehrer gut.'],
  'arbeiten':['Ich arbeite in Berlin.','Wo arbeitest du?','Wir arbeiten heute zusammen.','Mein Vater arbeitet im Krankenhaus.','Sie arbeitet von Montag bis Freitag.'],
  'fragen':['Ich frage den Lehrer.','Darf ich etwas fragen?','Er fragt nach dem Preis.','Wir fragen eine Mitarbeiterin.','Sie fragt: „Wo ist das Gleis?“'],
  'antworten':['Ich antworte auf die Frage.','Bitte antworte langsam.','Er antwortet auf Deutsch.','Wir antworten zusammen.','Sie antwortet sofort.'],
  'kaufen':['Ich kaufe ein Brot.','Wo kaufst du Reis?','Wir kaufen heute Gemüse.','Er kauft eine Fahrkarte.','Sie kauft zwei Äpfel.'],
  'suchen':['Ich suche den Reis.','Suchst du die Kasse?','Wir suchen einen Supermarkt.','Er sucht seine Karte.','Sie sucht frisches Gemüse.'],
  'finden':['Ich finde die Milch.','Findest du den Preis günstig?','Wir finden die Kasse nicht.','Er findet seinen Einkaufswagen.','Sie findet das Brot lecker.'],
  'brauchen':['Ich brauche eine Tüte.','Brauchst du noch Wasser?','Wir brauchen ein Kilo Reis.','Er braucht einen Einkaufswagen.','Sie braucht ihre Karte.'],
  'kosten':['Das Brot kostet zwei Euro.','Wie viel kostet der Reis?','Die Äpfel kosten drei Euro.','Was kostet diese Fahrkarte?','Das kostet nicht viel.'],
  'bezahlen':['Ich bezahle mit Karte.','Möchtest du bar bezahlen?','Wir bezahlen an der Kasse.','Er bezahlt das Brot.','Sie bezahlt zehn Euro.'],
  'warten':['Ich warte auf den Bus.','Wartest du auf den Zug?','Wir warten am Gleis drei.','Er wartet seit zehn Minuten.','Sie wartet vor dem Bahnhof.'],
  'fahren':['Ich fahre mit dem Zug.','Wann fährt der Bus?','Wir fahren nach Berlin.','Er fährt jeden Morgen zur Universität.','Sie fährt heute nicht.'],
  'einsteigen':['Ich steige in den Bus ein.','Wo steigen wir ein?','Er steigt am Bahnhof ein.','Bitte steigen Sie vorne ein.','Sie steigt schnell in den Zug ein.'],
  'aussteigen':['Ich steige an der Universität aus.','Wo musst du aussteigen?','Wir steigen am Hauptbahnhof aus.','Er steigt an der nächsten Haltestelle aus.','Bitte steigen Sie rechts aus.'],
  'ankommen':['Der Zug kommt um neun Uhr an.','Wann kommst du an?','Wir kommen pünktlich in Berlin an.','Der Bus kommt zehn Minuten später an.','Sie kommt heute Abend an.'],
  'abfahren':['Der Zug fährt um acht Uhr ab.','Wann fährt der Bus ab?','Wir fahren von Gleis vier ab.','Der Zug fährt gleich ab.','Sie fährt morgen früh ab.'],
  'verpassen':['Ich verpasse den Zug.','Verpasst du oft den Bus?','Wir dürfen die Verbindung nicht verpassen.','Er verpasst seine Haltestelle.','Sie hat den Zug knapp verpasst.'],
  'umsteigen':['Ich steige in Köln um.','Wo müssen wir umsteigen?','Er steigt am Hauptbahnhof um.','Wir müssen einmal umsteigen.','Sie steigt in den Bus um.']
};
const specialExamples={
  'hallo':['Hallo, ich heiße Rahman.','Hallo, wie geht es dir?','Sie sagt freundlich: „Hallo!“','Hallo Anna, schön dich zu sehen.','Ich sage meinem Nachbarn Hallo.'],
  'guten Morgen':['Guten Morgen, Frau Müller.','Ich sage: „Guten Morgen!“','Guten Morgen, wie geht es Ihnen?','Er wünscht uns einen guten Morgen.','Guten Morgen, der Unterricht beginnt.'],
  'ich':['Ich heiße Rahman.','Ich komme aus Bangladesch.','Ich lerne Deutsch.','Ich wohne in Berlin.','Ich bin Student.'],
  'du':['Wie heißt du?','Wo wohnst du?','Sprichst du Deutsch?','Du bist sehr freundlich.','Kommst du heute?'],
  'Sie':['Wie heißen Sie?','Woher kommen Sie?','Sprechen Sie Englisch?','Möchten Sie eine Tüte?','Zahlen Sie bar?'],
  'aus':['Ich komme aus Bangladesch.','Sie kommt aus Deutschland.','Der Zug fährt aus dem Bahnhof.','Ich nehme das Brot aus der Tüte.','Aus welcher Stadt kommst du?'],
  'Deutschland':['Ich wohne in Deutschland.','Deutschland liegt in Europa.','Er kommt aus Deutschland.','In Deutschland lerne ich Deutsch.','Wir fahren morgen nach Deutschland.'],
  'Bangladesch':['Ich komme aus Bangladesch.','Meine Familie lebt in Bangladesch.','Bangladesch liegt in Südasien.','Wir fliegen nach Bangladesch.','Er erzählt von Bangladesch.'],
  'der Name':['Mein Name ist Rahman.','Wie ist dein Name?','Bitte schreiben Sie Ihren Namen.','Der Name steht auf der Fahrkarte.','Ich kenne seinen Namen nicht.'],
  'das Land':['Aus welchem Land kommst du?','Bangladesch ist mein Land.','Deutschland ist ein Land in Europa.','Ich möchte das Land kennenlernen.','In diesem Land spricht man Deutsch.'],
  'die Stadt':['Berlin ist eine große Stadt.','In welcher Stadt wohnst du?','Die Stadt ist heute sehr ruhig.','Wir fahren mit dem Bus in die Stadt.','Ich kenne diese Stadt noch nicht.'],
  'die Sprache':['Deutsch ist eine Sprache.','Welche Sprache sprichst du?','Ich lerne eine neue Sprache.','Diese Sprache klingt schön.','Sprache verbindet Menschen.'],
  'das Jahr':['Ich bin zwanzig Jahre alt.','Ein Jahr hat zwölf Monate.','Ich lerne seit einem Jahr Deutsch.','Nächstes Jahr fahre ich nach Deutschland.','Das Jahr beginnt im Januar.'],
  'der Student':['Ich bin Student.','Der Student lernt Deutsch.','Ein Student fragt den Lehrer.','Der Student wohnt im Wohnheim.','Heute fährt der Student zur Universität.'],
  'die Studentin':['Sie ist Studentin.','Die Studentin lernt Deutsch.','Eine Studentin fragt den Lehrer.','Die Studentin wohnt im Wohnheim.','Heute fährt die Studentin zur Universität.'],
  'die Universität':['Ich studiere an der Universität.','Wo ist die Universität?','Die Universität ist sehr groß.','Wir fahren mit dem Bus zur Universität.','Der Deutschkurs ist an der Universität.'],
  'die Familie':['Meine Familie lebt in Dhaka.','Wie groß ist deine Familie?','Ich telefoniere mit meiner Familie.','Am Sonntag besucht er seine Familie.','Das ist ein Foto von meiner Familie.'],
  'der Beruf':['Was sind Sie von Beruf?','Mein Beruf ist Ingenieur.','Welchen Beruf möchtest du lernen?','Sie spricht über ihren Beruf.','Dieser Beruf ist interessant.'],
  'Deutsch':['Ich lerne Deutsch.','Sprichst du Deutsch?','Der Unterricht ist auf Deutsch.','Bitte sagen Sie das auf Deutsch.','Mein Deutsch wird besser.'],
  'Englisch':['Ich spreche Englisch.','Verstehst du Englisch?','Das Buch ist auf Englisch.','Sie erklärt das Wort auf Englisch.','Wir sprechen heute kein Englisch.'],
  'alt':['Ich bin zwanzig Jahre alt.','Wie alt bist du?','Mein Bruder ist achtzehn Jahre alt.','Das Gebäude ist sehr alt.','Der Zug ist alt, aber bequem.'],
  'billig':['Das Brot ist billig.','Wo ist der Reis billig?','Diese Äpfel sind heute billig.','Der Bus ist billiger als der Zug.','Billig ist nicht immer schlecht.'],
  'teuer':['Das Fleisch ist teuer.','Ist die Fahrkarte teuer?','Diese Tomaten sind zu teuer.','Der Zug ist teurer als der Bus.','In diesem Supermarkt ist Milch nicht teuer.'],
  'bar':['Ich bezahle bar.','Kann ich bar bezahlen?','Er zahlt zehn Euro bar.','Wir haben kein Bargeld und zahlen nicht bar.','Bar oder mit Karte?'],
  'bitte':['Ein Brot, bitte.','Sprechen Sie bitte langsam.','Bitte helfen Sie mir.','Hier ist Ihre Fahrkarte, bitte.','Noch eine Tüte, bitte.'],
  'danke':['Danke für Ihre Hilfe.','Nein, danke.','Danke, das ist sehr freundlich.','Vielen Dank für die Fahrkarte.','Ich sage der Kassiererin: „Danke.“'],
  'geöffnet':['Der Supermarkt ist geöffnet.','Ist das Geschäft heute geöffnet?','Die Kasse ist noch geöffnet.','Am Sonntag ist dieser Laden nicht geöffnet.','Die Tür ist geöffnet.'],
  'pünktlich':['Der Zug ist pünktlich.','Bitte komm pünktlich.','Wir sind heute pünktlich.','Der Bus fährt pünktlich ab.','Sie kommt immer pünktlich zur Universität.'],
  'spät':['Der Zug ist spät.','Es ist schon spät.','Warum kommst du so spät?','Der Bus fährt zehn Minuten zu spät ab.','Heute arbeite ich bis spät.'],
  'früh':['Ich stehe früh auf.','Der Zug fährt früh ab.','Wir kommen morgen früh.','Es ist noch zu früh.','Sie arbeitet von früh bis spät.'],
  'heute':['Heute lerne ich Deutsch.','Der Zug ist heute pünktlich.','Was machst du heute?','Heute kaufe ich Gemüse.','Wir arbeiten heute nicht.'],
  'morgen':['Morgen fahre ich nach Berlin.','Bis morgen!','Was machst du morgen?','Der Supermarkt ist morgen geöffnet.','Morgen kommt meine Familie.'],
  'nach':['Wir fahren nach Berlin.','Nach dem Unterricht kaufe ich ein.','Der Zug fährt nach Hamburg.','Ich gehe nach Hause.','Nach zehn Minuten kommt der Bus.'],
  'von':['Der Zug fährt von Gleis zwei.','Ich komme von der Universität.','Das ist ein Geschenk von Anna.','Der Bus fährt von Berlin nach Potsdam.','Von hier sind es fünf Minuten.'],
  'direkt':['Der Zug fährt direkt nach Berlin.','Gibt es eine direkte Verbindung?','Wir fahren direkt zum Bahnhof.','Bitte gehen Sie direkt zur Kasse.','Der Bus kommt direkt aus der Stadt.'],
  'zurück':['Ich fahre morgen zurück.','Wann kommst du zurück?','Wir gehen zum Bahnhof zurück.','Er gibt mir das Geld zurück.','Sie fährt zurück nach Hause.'],
  'links':['Das Gleis ist links.','Gehen Sie bitte nach links.','Links ist die Haltestelle.','Der Supermarkt ist links vom Bahnhof.','Schau nach links!'],
  'rechts':['Die Kasse ist rechts.','Gehen Sie bitte nach rechts.','Rechts ist der Ausgang.','Der Bus hält rechts vom Bahnhof.','Schau nach rechts!'],
  'wo':['Wo ist der Bahnhof?','Wo wohnst du?','Wo kann ich bezahlen?','Wo fährt der Zug ab?','Weißt du, wo die Kasse ist?'],
  'wann':['Wann kommt der Zug?','Wann hast du Zeit?','Wann ist der Supermarkt geöffnet?','Seit wann lernst du Deutsch?','Weißt du, wann der Bus abfährt?']
};
const englishExamples={
  'hallo':['Hello, my name is Rahman.','Hello, how are you?','She says “Hello!” in a friendly way.','Hello Anna, nice to see you.','I say hello to my neighbor.'],
  'guten Morgen':['Good morning, Ms. Müller.','I say, “Good morning!”','Good morning, how are you?','He wishes us a good morning.','Good morning, the class is starting.'],
  'heißen':['My name is Rahman.','What is your name?','Her name is Anna.','My brother’s name is Karim.','What is your name? (formal)'],
  'ich':['My name is Rahman.','I come from Bangladesh.','I am learning German.','I live in Berlin.','I am a student.'],
  'du':['What is your name?','Where do you live?','Do you speak German?','You are very friendly.','Are you coming today?'],
  'Sie':['What is your name? (formal)','Where do you come from? (formal)','Do you speak English? (formal)','Would you like a bag?','Are you paying in cash?'],
  'kommen':['I come from Bangladesh.','The bus arrives at eight o’clock.','Are you coming today?','My friend is coming later.','We are coming by train.'],
  'aus':['I come from Bangladesh.','She comes from Germany.','The train leaves the station.','I take the bread out of the bag.','Which city do you come from?'],
  'Deutschland':['I live in Germany.','Germany is in Europe.','He comes from Germany.','I am learning German in Germany.','We are traveling to Germany tomorrow.'],
  'Bangladesch':['I come from Bangladesh.','My family lives in Bangladesh.','Bangladesh is in South Asia.','We are flying to Bangladesh.','He talks about Bangladesh.'],
  'wohnen':['I live in Berlin.','Where do you live?','We live together.','My family lives in Dhaka.','He lives next to the university.'],
  'sprechen':['I speak a little German.','Do you speak English?','Today we are talking about family.','Please speak slowly.','She is speaking with her teacher.'],
  'Deutsch':['I am learning German.','Do you speak German?','The class is in German.','Please say that in German.','My German is getting better.'],
  'Englisch':['I speak English.','Do you understand English?','The book is in English.','She explains the word in English.','We are not speaking English today.'],
  'lernen':['I learn German every day.','We are learning ten new words.','Do you study at home?','He is studying for the exam.','She learns quickly.'],
  'verstehen':['I understand the question.','Do you understand me?','We understand the sentence now.','I understand only a little German.','She understands the teacher well.'],
  'alt':['I am twenty years old.','How old are you?','My brother is eighteen years old.','The building is very old.','The train is old but comfortable.'],
  'arbeiten':['I work in Berlin.','Where do you work?','We are working together today.','My father works at the hospital.','She works from Monday to Friday.'],
  'fragen':['I ask the teacher.','May I ask something?','He asks about the price.','We ask an employee.','She asks, “Where is the platform?”'],
  'antworten':['I answer the question.','Please answer slowly.','He answers in German.','We answer together.','She answers immediately.'],
  'der Name':['My name is Rahman.','What is your name?','Please write your name.','The name is on the ticket.','I do not know his name.'],
  'das Land':['Which country do you come from?','Bangladesh is my country.','Germany is a country in Europe.','I would like to get to know the country.','German is spoken in this country.'],
  'die Stadt':['Berlin is a big city.','Which city do you live in?','The city is very quiet today.','We take the bus into the city.','I do not know this city yet.'],
  'die Sprache':['German is a language.','Which language do you speak?','I am learning a new language.','This language sounds beautiful.','Language connects people.'],
  'das Jahr':['I am twenty years old.','A year has twelve months.','I have been learning German for a year.','Next year I am going to Germany.','The year begins in January.'],
  'der Student':['I am a student.','The student is learning German.','A student asks the teacher.','The student lives in the dormitory.','Today the student travels to the university.'],
  'die Studentin':['She is a student.','The student is learning German.','A student asks the teacher.','The student lives in the dormitory.','Today the student travels to the university.'],
  'die Universität':['I study at the university.','Where is the university?','The university is very large.','We take the bus to the university.','The German course is at the university.'],
  'die Familie':['My family lives in Dhaka.','How big is your family?','I am talking to my family on the phone.','He visits his family on Sunday.','This is a photo of my family.'],
  'der Beruf':['What is your occupation?','I am an engineer by profession.','Which profession would you like to learn?','She talks about her occupation.','This profession is interesting.'],
  'kaufen':['I buy a loaf of bread.','Where do you buy rice?','We are buying vegetables today.','He buys a ticket.','She buys two apples.'],
  'suchen':['I am looking for the rice.','Are you looking for the checkout?','We are looking for a supermarket.','He is looking for his card.','She is looking for fresh vegetables.'],
  'finden':['I find the milk.','Do you find the price reasonable?','We cannot find the checkout.','He finds his shopping cart.','She finds the bread tasty.'],
  'brauchen':['I need a bag.','Do you need more water?','We need one kilogram of rice.','He needs a shopping cart.','She needs her card.'],
  'kosten':['The bread costs two euros.','How much does the rice cost?','The apples cost three euros.','How much does this ticket cost?','That does not cost much.'],
  'billig':['The bread is cheap.','Where is rice cheap?','These apples are cheap today.','The bus is cheaper than the train.','Cheap does not always mean bad.'],
  'teuer':['The meat is expensive.','Is the ticket expensive?','These tomatoes are too expensive.','The train is more expensive than the bus.','Milk is not expensive in this supermarket.'],
  'bezahlen':['I pay by card.','Would you like to pay in cash?','We pay at the checkout.','He pays for the bread.','She pays ten euros.'],
  'bar':['I pay in cash.','Can I pay in cash?','He pays ten euros in cash.','We have no cash and do not pay in cash.','Cash or card?'],
  'bitte':['One loaf of bread, please.','Please speak slowly.','Please help me.','Here is your ticket.','One more bag, please.'],
  'danke':['Thank you for your help.','No, thank you.','Thank you, that is very kind.','Many thanks for the ticket.','I say “Thank you” to the cashier.'],
  'geöffnet':['The supermarket is open.','Is the shop open today?','The checkout is still open.','This shop is not open on Sunday.','The door is open.'],
  'warten':['I am waiting for the bus.','Are you waiting for the train?','We are waiting at platform three.','He has been waiting for ten minutes.','She is waiting in front of the station.'],
  'fahren':['I travel by train.','When does the bus leave?','We are traveling to Berlin.','He travels to the university every morning.','She is not traveling today.'],
  'einsteigen':['I get on the bus.','Where do we get on?','He gets on at the station.','Please enter at the front.','She quickly gets on the train.'],
  'aussteigen':['I get off at the university.','Where do you have to get off?','We get off at the main station.','He gets off at the next stop.','Please exit on the right.'],
  'ankommen':['The train arrives at nine o’clock.','When do you arrive?','We arrive in Berlin on time.','The bus arrives ten minutes later.','She arrives this evening.'],
  'abfahren':['The train departs at eight o’clock.','When does the bus depart?','We depart from platform four.','The train is about to depart.','She leaves early tomorrow.'],
  'verpassen':['I miss the train.','Do you often miss the bus?','We must not miss the connection.','He misses his stop.','She narrowly missed the train.'],
  'pünktlich':['The train is on time.','Please arrive on time.','We are on time today.','The bus departs on time.','She always arrives at the university on time.'],
  'spät':['The train is late.','It is already late.','Why are you so late?','The bus departs ten minutes late.','Today I work until late.'],
  'früh':['I get up early.','The train departs early.','We are coming early tomorrow.','It is still too early.','She works from early until late.'],
  'heute':['Today I am learning German.','The train is on time today.','What are you doing today?','Today I am buying vegetables.','We are not working today.'],
  'morgen':['Tomorrow I am traveling to Berlin.','See you tomorrow!','What are you doing tomorrow?','The supermarket is open tomorrow.','My family is coming tomorrow.'],
  'nach':['We are traveling to Berlin.','I shop after class.','The train is going to Hamburg.','I am going home.','The bus comes after ten minutes.'],
  'von':['The train departs from platform two.','I am coming from the university.','This is a gift from Anna.','The bus travels from Berlin to Potsdam.','It is five minutes from here.'],
  'umsteigen':['I change trains in Cologne.','Where do we have to change?','He changes at the main station.','We have to change once.','She changes to the bus.'],
  'direkt':['The train goes directly to Berlin.','Is there a direct connection?','We go directly to the station.','Please go directly to the checkout.','The bus comes directly from the city.'],
  'zurück':['I am traveling back tomorrow.','When are you coming back?','We go back to the station.','He gives the money back to me.','She travels back home.'],
  'links':['The platform is on the left.','Please go left.','The stop is on the left.','The supermarket is to the left of the station.','Look to the left!'],
  'rechts':['The checkout is on the right.','Please go right.','The exit is on the right.','The bus stops to the right of the station.','Look to the right!'],
  'wo':['Where is the station?','Where do you live?','Where can I pay?','Where does the train depart?','Do you know where the checkout is?'],
  'wann':['When does the train arrive?','When do you have time?','When is the supermarket open?','How long have you been learning German?','Do you know when the bus departs?']
};
function naturalExamples(word,wordType,article,englishMeaning){
  if(verbExamples[word])return verbExamples[word];
  if(specialExamples[word])return specialExamples[word];
  const base=safeWord(word);
  if(wordType==='noun'){
    const acc=article==='der'?'den':article==='die'?'die':'das';
    return [`Wo ist ${article} ${base}?`,`Ich brauche ${acc} ${base} heute.`,`Können Sie mir ${acc} ${base} zeigen?`,`Ich suche ${acc} ${base}.`,`${article[0].toUpperCase()+article.slice(1)} ${base} ist gleich hier.`];
  }
  if(wordType==='adjective')return[`Das ist ${word}.`,`Heute ist es ${word}.`,`Ist das wirklich ${word}?`,`Ich finde das ${word}.`,`Es ist nicht ${word}.`];
  if(wordType==='verb')return[`Ich möchte heute ${word}.`,`Wir müssen jetzt ${word}.`,`Kannst du bitte ${word}?`,`Wann können wir ${word}?`,`Am Wochenende möchte ich ${word}.`];
  if(wordType==='number')return[`Ich brauche ${word} Tickets.`,`Der Bus kommt in ${word} Minuten.`,`Das kostet ${word} Euro.`,`Wir sind ${word} Personen.`,`Bitte schreiben Sie die Zahl ${word}.`];
  return[`Ich benutze das Wort „${word}“.`,`Was bedeutet „${word}“?`,`Bitte sag „${word}“ noch einmal.`,`Heute lerne ich „${word}“.`,`Jetzt verstehe ich „${word}“.`];
}
function makeEntry(unit, raw, index){
  const [word,wordType,article,plural,englishMeaning,banglaMeaning]=raw;
  const base=safeWord(word); const id=`a1-${unit.id}-${String(index+1).padStart(2,'0')}-${base.toLowerCase().replaceAll('ä','ae').replaceAll('ö','oe').replaceAll('ü','ue').replaceAll('ß','ss').replace(/[^a-z]+/g,'-')}`;
  const noun=wordType==='noun',germanExamples=naturalExamples(word,wordType,article,englishMeaning);
  const sentence=germanExamples[0];
  const sentEn=`Example: ${englishMeaning}.`;
  const sentBn=`উদাহরণ: ${banglaMeaning}।`;
  const generatedEnglish=wordType==='noun'?[`Where is the ${englishMeaning}?`,`I need the ${englishMeaning} today.`,`Can you show me the ${englishMeaning}?`,`I am looking for the ${englishMeaning}.`,`The ${englishMeaning} is right here.`]:wordType==='verb'?[`I would like ${englishMeaning.replace(/^to /,'to ')} today.`,`We have to ${englishMeaning.replace(/^to /,'')} now.`,`Can you please ${englishMeaning.replace(/^to /,'')}?`,`When can we ${englishMeaning.replace(/^to /,'')}?`,`At the weekend I would like ${englishMeaning.replace(/^to /,'to ')}.`]:wordType==='adjective'?[`That is ${englishMeaning}.`,`Today it is ${englishMeaning}.`,`Is that really ${englishMeaning}?`,`I find that ${englishMeaning}.`,`It is not ${englishMeaning}.`]:wordType==='number'?[`I need ${englishMeaning} tickets.`,`The bus comes in ${englishMeaning} minutes.`,`That costs ${englishMeaning} euros.`,`We are ${englishMeaning} people.`,`Please write the number ${englishMeaning}.`]:null;
  const contexts=germanExamples.map((german,i)=>({german,english:englishExamples[word]?.[i]||generatedEnglish?.[i]||`A natural example using “${englishMeaning}”.`,bangla:`“${banglaMeaning}” ব্যবহার করে প্রাসঙ্গিক উদাহরণ ${i+1}।`}));
  const funny = unit.id==='transport'?'Rahman checks the platform three times—Dhaka traffic taught him that a confident guess is not a timetable.':unit.id==='supermarket'?'Rahman finds the item, then checks whether Sunday has secretly closed the shop already.':'Rahman practices the sentence slowly; his German class answers quickly, but his tea is still faster.';
  return {id,word,wordType,article:article||null,plural:plural||null,level:'A1',topic:unit.title,englishMeaning,banglaMeaning,mainSentence:sentence,mainSentenceEnglish:sentEn,mainSentenceBangla:sentBn,pronunciationText:word,imageQuery:`${englishMeaning} everyday life Germany clear photo`,videoQuery:['verb','adjective'].includes(wordType)?`${englishMeaning} action`:null,contextSentences:contexts,oppositeWord:opposites[word]||plural||unit.words[(index+1)%unit.words.length][0],usageNote:noun?`Use ${word} when talking about ${englishMeaning}. Learn the article together with the noun.`:`Use “${word}” in everyday situations like the five examples below. Listen and repeat the whole sentence, not only the word.`,dialogue:[],funnyContext:null,grammarNote:null,commonMistake:null,relatedWords:[],exercise:null};
}

const categoryMeta={
  introductions:[['Greetings & basic expressions','👋'],['Countries, cities & languages','🌍'],['Study, work & family','🎓']],
  supermarket:[['Everyday food & drinks','🥖'],['Shopping & prices','🏷️'],['Checkout & payment','💳']],
  transport:[['Trains, buses & places','🚆'],['Travel actions & delays','🚦'],['Time, directions & questions','🧭']]
};
const course={level:'A1',title:'A1 Foundations',units:units.map(unit=>({...unit,lessons:[0,1,2].map(li=>{const meta=categoryMeta[unit.id]?.[li]||[`${unit.title} ${li+1}`,unit.icon];return{id:`a1-${unit.id}-${li+1}`,title:meta[0],icon:meta[1],category:unit.title,wordIds:unit.words.slice(li*10,li*10+10).map((w,i)=>makeEntry(unit,w,li*10+i).id)}})}))};
const vocabulary=units.flatMap(unit=>unit.words.map((w,i)=>makeEntry(unit,w,i)));
const normalizeHeadword=value=>String(value||'').toLocaleLowerCase('de').replace(/^(der|die|das)\s+/,'').trim();
const meaningByWord=new Map(vocabulary.map(entry=>[normalizeHeadword(entry.word),entry.englishMeaning]));
for(const entry of vocabulary){
  entry.oppositeMeaning=meaningByWord.get(normalizeHeadword(entry.oppositeWord))||contrastTranslations[entry.oppositeWord]||`${entry.englishMeaning} (related or plural form)`;
}
const stories=units.map((u,ui)=>({id:u.id,title:u.storyTitle,unitId:u.id,visualQuery:`${u.title} Germany friendly student`,sentences:u.words.slice(0,8).map((w,i)=>({german:i%2?`Rahman lernt „${w[0]}“.`:`Heute sieht Rahman: ${w[0]}.`,english:i%2?`Rahman learns “${w[4]}”.`:`Today Rahman sees: ${w[4]}.`,bangla:i%2?`রহমান “${w[5]}” শেখে।`:`আজ রহমান দেখে: ${w[5]}।`,target:w[0]})),questions:[{q:'Who is the story about?',options:['Rahman','Anna','Thomas'],answer:'Rahman'},{q:'Where does the story happen?',options:[u.title,'At home','At the beach'],answer:u.title},{q:'What is he doing?',options:['Learning German','Sleeping','Cooking'],answer:'Learning German'}]}));
await mkdir('data',{recursive:true});
await writeFile('data/courses.json',JSON.stringify({course,vocabulary,stories},null,2),'utf8');
console.log(`Generated ${vocabulary.length} entries.`);
