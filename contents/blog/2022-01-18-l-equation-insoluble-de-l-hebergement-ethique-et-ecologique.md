---
title: "Hébergement éthique et écologique : équation insoluble ?"
description: "Ce sont des sujets récurrents : sortir des GAFAMs et réduire notre emprunte liée au numérique. Plus facile à dire qu’à faire !"
date: "2022-01-18T08:00:00.000Z"
draft: false
categories:
  - Numérique
tags:
  - hébergement
  - gafams
  - cloud
illustration:
  url: "/public/illustrations/terminal-linux.png"
  alt: "Capture d’écran d’un terminal Linux"
---

# Hébergement éthique et écologique : une équation insoluble ?

Dans un secteur tel que le numérique, fourmillant d’innovations et de changements "disruptifs", difficile d’embrasser la révolution numérique en alliant à la fois l’éthique et l’écologie.

J’ai, dans un précédent billet, détaillé les [principes à retenir pour un numérique qui émancipe](./quels-outils-numeriques-pour-eelv). En réalité, ces grands principes sont applicables à toute organisation humaine qui poursuivrait les mêmes buts. Mais voilà, en pratique, c’est bien plus facile à dire qu’à faire ! Du moins, si on recherche la cohérence entre les valeurs et les actes.

## Considérations éthiques

L’éthique humaniste, de recherche du progrès humain et d’idéal démocratique peuvent se décliner en principes de mise en œuvre concrète.

Tout d’abord, l’open-source, et plus particulièrement, le logiciel libre me semblent être une condition sine qua non pour tout logiciel ayant un minimum d’égard à l’encontre de ses utilisateurices.

En effet, le logiciels sont des facilitateurs, mais ils orientent nos choix. Si on ne peut vérifier leur contenu, on n’est bien en peine de déterminer leur action véritable.

Je soutiens l’initiative [Public Money, Public Code](https://publiccode.eu/fr/) (argent public, code public) et les partis politiques étant largement financés par de l’argent public, il me semble logique que le code mis en œuvre soit ouvert également.

Je pense également que du point de vue éthique, fournir des logiciels via le web est la seule voie envisageable. En effet, c’est la seule manière de fournir des logiciels dont la compatibilité est universelle (pour peu que l’on respecte les standards de développement).

Il semble également nécessaire de s’assurer de l’origine des matériaux mis en œuvre pour faire fonctionner les outils numériques que nous utilisons. Il existe de nombreux labels que j’ai détaillé dans mes [cours GreenIT](https://slides.com/nfroidure/adopter-une-approche-ecologique-au-sein-du-dsi-de-l-entreprise), je n’y reviens donc pas.

Il convient également de s’enquérir du fait que les services sont hébergés (quand on ne peut pas faire autrement, nous y reviendrons), ils le soient dans des pays dont la législation protège la vie privée des utilisateurices.

Bien-sûr, cette confidentialité des données personnelles doit être assurée par les instances qui fournissent ces services en faisant preuve de professionnalisme (application de la réglementation européenne, le fameuse RGPD), suivi des recommendation de la CNIL, mises à jour de sécurité...

L’éthique dans le numérique, c’est aussi faire preuve d’inclusivité : proposer des alternatives papier, rendre les interfaces simples, garantir l’accès aux personnes porteuses de handicap et d’une manière générale s’adapter aux préférences ou aux contraintes des utilisateurices.

Et enfin, la conception même de ces services/interfaces se doit d’être éthique, exit donc les solutions biaisées à base de [dark patterns](https://fr.wikipedia.org/wiki/Dark_pattern), exit, d’une certaine manière, l’intelligence artificielle à base de réseaux de neurone dont l’explicabilité est relative à ce jour.

Les interfaces des logiciels restreignent les actions possibles dans les interactions entre ses utilisateurices. Il est donc nécessaire que ces restrictions soient transparentes et décidées de façon démocratique. 

Bref, c’est loin d’être simple, et nous ne parlons ici que d’éthique. Ajoutons maintenant à cela les limites planétaires.

## Considérations environnementales

Nous pouvons considérer que l’écologie est de l’ordre de l’éthique, mais quand on parle d’emprunte écologique du numérique, on parle surtout d’économie de matières premières et de limitation d’émission de gaz à effet de serre par la consommation d’énergie lors de la fabrication et de l’usage des équipements numériques.

Pour atteindre ces objectifs, tout comme pour l’éthique, les labels environnementaux au niveau du matériel sont importants. Ils permettent de s’assurer de la recyclabilité, de la réparabilité, d’une fabrication la moins nuisible possible pour l’environnement.

Ensuite, la sobriété requiert de limiter l’énergie utilisée : développer des algorithmes performants et mis à jour, utiliser du matériel optimisé, éteindre les machines non-utilisées et rationaliser/mutualiser les usages pour réaliser des économies d’échelle. Planifier l’execution des traitements nécessaires mais qui ne requièrent pas d’être fait dans l’instant est un autre moyen de limiter le nombre de serveurs.

Enfin, un moyen de limiter les émissions du numérique est d’utiliser les énergies renouvelables comme source d’énergie et de réutiliser la chaleur produite par les serveurs.

## Du point de vue des usages

Entre ces deux grandes considérations, il y a également l’usage que nous faisons du numérique.

En premier lieu, tout ne doit pas forcément être numérique, souvent, nous parvenons à nos fins sans cet outil et avec succès. Dans ces cas là, l’urgence est de ne rien changer.

Une bonne manière de limiter l’empreinte numérique d’une organisation est d’utiliser la facturation à l’usage. Nous sommes plus prompts à faire des économies qu’à limiter notre empreinte, c’est humain. La facturation à l’usage est un signal qui a tendance à faire baisser la consommation.

Un autre moyen de limiter l’utilisation du numérique est d’optimiser le parcours de réalisation d’une tâche (autrement dit, de travailler l’expérience utilisateurice). Plus vite on effectue une action, plus vite on éteint son écran (à condition, bien-sûr que l’on ne capte pas éternellement l’attention des utilisateurices, citons ici la technique de l’[infinite scroll](https://www.francetvinfo.fr/internet/telephonie/video-le-createur-du-scroll-infini-sur-smartphone-cherche-aujourd-hui-des-parades-a-son-invention_4101423.html)).

## Difficile conciliation

Quelles solutions donc pour concilier tous ces facteurs et construire le SI qui fera pâlir toutes les démarches RSE des organisations les plus respectueuses de l’éthique et de l’environnement ?

C’est loin d’être simple. Le choix est presque binaire entre deux types d’acteurs diamétralement opposés.

### Les GAFAMs et autres startups

C’est bien connu, les GAFAMs se fichent bien du sort des humain·es. Seul le profit compte.

C’est donc l’éthique qui est sacrifiée sur l’hôtel économique. Ne comptez pas sur ces sociétés pour investir dans du matériel éthique, ou à la marge, pour l’opération de social washing de l’année.

Le code source est bien entendu fermé, à quelques exceptions près, mais rarement pour des raisons éthiques ou de progrès. Parfois, le jeu est à somme positive : développement de Linux, de moteurs de base de données, de format d’échange standard (HTTP2 puis 3), développement d’outils de programmation (VSCode, GitLab). D’autres fois, il permet de faire du business plus vite ou de conquérir un marché (Android, ElasticSearch, MongoDB).

Oubliez aussi le travail des enfants, le respect de la vie privée ou simplement de l’équilibre mental des utilisateurices. Si vous faire devenir bipolaire génère plus de clics, il y a fort à parier que Facebook s’y emploiera, si ça ne se voit pas trop.

Enfin, ne demandez pas de comptes à Facebook sur ses algorithmes d’intelligence artificielle. Les objectifs des ces IAs sont secrets, les données d’entraînement sont privées (pour ne pas dire accaparées).

En revanche, il y a une convergence entre les intérêts économiques et certains intérêts écologiques. C’est pourquoi la performance, la qualité de service, l’optimisation de l’expérience utilisateur est de ce côté imbattable.

La maîtrise technologique permet une facturation à l’usage bluffante. Vous avez besoin de juste 128mo de RAM pendant 1 milliseconde ? C’est possible et c’est le prix d’un millionième de baguette ! (0,0000000021 USD via AWS Lambda à Francfort).

Ceci est rendu possible grâce à une maîtrise technologique induite par une force de travail composée des meilleurs ingénieur·es disponibles avec des rémunérations qui crèvent les plafonds. Ici, par exemple, ce sont des algorithmes de placement de charge de travail sophistiqués qui sont utilisés (une variante plus complexe du [problème du sac à dos](https://fr.wikipedia.org/wiki/Probl%C3%A8me_du_sac_%C3%A0_dos) car évoluant en fonction du temps).

L’autonomie énergétique est un sujet pour les GAFAMs et c’est ainsi que la consommation du cloud de Google est entièrement compensée en énergie renouvelable (et bientôt en temps réel).

Autre dérive des GAFAMs, leur fâcheuse tendance à vouloir vous sortir du web. Citons par exemple l’application web mobile Facebook dont les fonctionnalités se réduisent comme peau de chagrin pour vous inciter à installer l’application mobile (et partager toutes vos données personnelles : contacts, localisation...).

### L’économie solidaire et associative

De l’autre côté de l’éthique, se trouvent les acteurs de l’économie solidaire et associative. On peut citer les [Chatons](https://www.chatons.org/).

Ces derniers font tout ce qu’ils peuvent pour offrir les services le plus éthiques possibles.

Généralement, c’est au travers de l’utilisation de logiciels open-source de qualité variable. On peut citer la suite [FramaSoft](https://framasoft.org/fr/), par exemple, mais il est très difficile d’obtenir une expérience utilisateur au niveau de ce que proposent les GAFAMs et autres startups financées par le capital risque.

C’est ainsi que, bien souvent, une partie des personnes à qui on propose ces outils finissent par les déserter. Je suis, par exemple, un utilisateur assumé de Google Mail, à mon grand regret, le pragmatisme a fait son œuvre.

C’est très difficile pour ces structures de recruter des personnes compétentes car elles entrent en compétition avec des structures pouvant proposer des rémunérations très supérieures. Elles se livrent d’ailleurs une compétition féroce pour ces profils.

Au niveau environnemental, ce n’est pas aisé de se distinguer des GAFAMs. Bien malin celui qui distingue une puce très polluante d’une puce moins polluante. Il suffit de voir les énormes efforts développés par [FairPhone](https://www.fairphone.com/fr/) pour parvenir à nous proposer un SmartPhone réparable et "moins pire" que les autres au niveau éthique et environnemental.

Et pour la rationalité des usages, ces structures ne disposent pas de la masse critique pour rationaliser ces derniers. Généralement, vous obtiendrez une machine avec 1 cœur et 512Mo de RAM sur un hyperviseur avec bien de la chance si vous pouvez limiter la facture à une journée d’utilisation.

Cette puissance de calcul réservée sera disponible en tout temps que vous ayez besoin de l’utiliser ou pas.

Bref, là où l’éthique est au rendez-vous, l’expérience utilisateurice et l’usage relèvent du défi quotidien pour ces structures qui bien souvent ne s’aventurent pas sur le terrain de la performance ou de l’excellence technique dans leurs argumentaires commerciaux.

En effet, selon leur degré de maturité, elle accusent un retard plus ou moins important sur les GAFAMs. Aucune solution idéale donc.

## Perspectives

Conséquence directe de tout cela, **un hébergement éthique n’est pas ce qui se fait de mieux écologiquement** et, a contrario, **héberger ses données chez les GAFAMs est contraire à l’éthique humaniste**.

### L’efficacité, un devoir

Je pense qu’ils ne faut pas être naïfs face à cette situation. Les choix d’une organisation, a fortiori, quand elle veut changer le monde, doivent avant tout porter sur l’efficacité.

Il est bien-sûr nécessaire de creuser toutes les possibilités, mais, en dernier ressort, il me semble pertinent de faire des choix pragmatiques : choisir les outils qui fonctionnent et sont le moins préjudiciables à l’environnement et à l’éthique.

Cela ne dédouane pas de la responsabilité de faire émerger des alternatives. Pour ce faire, il me semble primordial de reposer sur la communauté du libre et d’y concentrer les efforts de développement de nouvelles offres et de consolidation des outils existants.

Et, bien-sûr, il me semble important de faire évoluer la législation pour exiger de la part des GAFAMs l’éthique qui leur fait défaut. Le RGPD a montré qu’il est possible de faire entendre une autre voix. Il ne manque que des politiques volontaristes.

### Des solutions partielles

Pour ne pas tomber dans le pragmatisme flemmard, il me semble important de souligner qu’il existe des solutions partielles.

Comme je l’ai démontré, c’est à cause des effets combinés d’un retard technologique avéré (le gendarme et le voleur appliqué au numérique) et d’un défaut de masse critique permettant des optimisations d’échelle que cette situation existe.

Certaines technologies permettent de gérer ce problème sans rogner sur la qualité du service fourni.

#### Pas de serveur, pas de problème

Une des solutions à ce problème est donc d’utiliser des technologies matures dans leur version open-source. Parmi elles, on peut citer l’hébergement de sites Internet statiques mutualisé. C’est tellement simple et si peu frayeux que bon nombre de services le proposent gratuitement.

Par exemple, le site que vous visitez est un site statique hébergé gratuitement sur GitHub Pages. Il est généré une fois pour toute, à chaque modification [grâce à ce script](https://github.com/nfroidure/politics/blob/main/.github/workflows/deploy.yml). Comme il est modifié au maximum un millier de fois par an, c’est un fonctionnement écologique qui correspond à 90% des sites web et qui permet des optimisations le rendant [plus écologique à l’usage](https://www.websitecarbon.com/website/nicolasfroidure-fr/).

Or, l’hébergement de sites statiques n’est pas nouveau et agnostique en terme de langage ou d’outil de création de site Internet. Il existe de nombreuses solutions fiables et stables pour ce faire : Linux, bien-sûr, pour le système d’exploitation, serveurs FTP pour le dépôt des fichiers, PAM pour la gestion des utilisateurs, NGinX/Apache et une gestion dynamique des hôtes virtuels.

De plus, il est tout à fait possible, au sein d’un site Internet statique de proposer des fonctions dynamiques en utilisant des serveurs externes ou des plugins embarqués (exemple, utiliser Framaform pour gérer le formulaire de contact d’un site, Strapi pour gérer leur contenu...). On peut donc mutualiser les serveurs de fonctionnalités communes à une myriade de sites.

Éviter d’utiliser des serveurs permet de simplifier les aspects techniques et pave la voie à une conciliation entre éthique et écologie pour une majeure partie de l’usage du web.

#### Le SaaS, chemin vers l’éthique

Le "Software as a Service" est une manière d’utiliser les logiciels sous forme d’abonnements / de facturation à l’usage. Bien-sûr, il existe de nombreuses solutions et toutes ne sont pas développées dans le respect de l’éthique ou même de la sobriété numérique.

Cependant, c’est un excellent moyen de maîtriser sa consommation numérique et de mutualiser les serveurs. Il faudrait favoriser l’émergence d’acteurs de l’économie solidaire dans ce secteur. On peut citer [Hello Asso](https://www.helloasso.com/) qui semble parvenir à se développer de façon vertueuse.

Utiliser un SaaS nécessite cependant l’utilisation d’OAuth2/OpenID pour la connexion, voire d’une API et d’un compte IFTT pour gérer la glue entre les fonctionnalités du système gérées par ces tiers.

Avantage : substituable et donc, permet de remplacer des briques par d’autres plus respectueuses tout au long du cycle de vie du SI.

### Des voies futures qui se dessinent

Enfin, comme le dit la maxime, la route est longue, mais la voie est libre ! L’avenir devrait nous permettre de faire mieux avec moins.

#### Un avenir sans serveur

Dans la droite ligne de l’hébergement statique, je pense qu’il est possible e tirer partie des technologies comme [le WebRTC](https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API/Connectivity).

Elle permet de se passer totalement de serveur (en théorie, en pratique, des serveur TURN/STUN sont nécessaires tant que les NATs seront nécessaires) et de communiquer en pair à pair (le fameux peer2peer) (des systèmes de vote, de chat, d’édition collaborative ... pourraient s’en saisir).

L’avantage du pair à pair ? Dès que plus personne n’est connecté, plus aucun matériel informatique ne tourne ! Pas de serveur, pas de centralisation : l’idéal de tout point de vue.

#### Auto-hébergement

Pour aller plus loin, il y a aussi la possibilité de s’auto-héberger. Nous avons toustes une box qui tourne 24/24 à la maison, elle pourrait bien être suffisante pour stocker notre blog (hors medias).

#### Un cloud libre et fédéré

Enfin, puisqu’il faudra toujours un peu de serveurs, je pense que nous devons rechercher l’émergence d’un cloud libre sous la forme d’une fédération de fournisseurs de service utilisant les mêmes protocoles et standards éthiques et environnementaux.

La recherche française peut être motrice pour apporter cet outil au bénéfice de l’Humanité, donnons lui les milliards des clouds souverains qui échouent sans surprise. La commande publique peut d’ailleurs amorcer la pompe : il n’existe aucun fondement sérieux pour maintenir le code source de la plupart de nos administrations fermé.

## En conclusion

On le voit, le sujet est très complexe, raisonner de façon binaire serait délétère. Cependant, **les perspectives sont nombreuses et ne demandent qu’à être développées**.

Les politiques peuvent y prendre leur part, que ce soit depuis leurs organisations respectives ou via les politiques qu’iels peuvent mettre en œuvre une fois élu·es.
