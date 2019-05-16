import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import * as _ from 'underscore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() resize: Subject<any>;
  @Input() name: string;

  height = 388;

  gridView: GridDataResult;
  pageSize = 20;
  skip = 0;
  private items: any[] = [{
    'Id': 'ALFKI',
    'CompanyName': 'Alfreds Futterkiste',
    'ContactName': 'Maria Anders',
    'ContactTitle': 'Sales Representative',
    'Address': 'Obere Str. 57',
    'City': 'Berlin',
    'PostalCode': '12209',
    'Country': 'Germany',
    'Phone': '030-0074321',
    'Fax': '030-0076545'
  }, {
    'Id': 'ANATR',
    'CompanyName': 'Ana Trujillo Emparedados y helados',
    'ContactName': 'Ana Trujillo',
    'ContactTitle': 'Owner',
    'Address': 'Avda. de la Constitución 2222',
    'City': 'México D.F.',
    'PostalCode': '05021',
    'Country': 'Mexico',
    'Phone': '(5) 555-4729',
    'Fax': '(5) 555-3745'
  }, {
    'Id': 'ANTON',
    'CompanyName': 'Antonio Moreno Taquería',
    'ContactName': 'Antonio Moreno',
    'ContactTitle': 'Owner',
    'Address': 'Mataderos  2312',
    'City': 'México D.F.',
    'PostalCode': '05023',
    'Country': 'Mexico',
    'Phone': '(5) 555-3932'
  }, {
    'Id': 'AROUT',
    'CompanyName': 'Around the Horn',
    'ContactName': 'Thomas Hardy',
    'ContactTitle': 'Sales Representative',
    'Address': '120 Hanover Sq.',
    'City': 'London',
    'PostalCode': 'WA1 1DP',
    'Country': 'UK',
    'Phone': '(171) 555-7788',
    'Fax': '(171) 555-6750'
  }, {
    'Id': 'BERGS',
    'CompanyName': 'Berglunds snabbköp',
    'ContactName': 'Christina Berglund',
    'ContactTitle': 'Order Administrator',
    'Address': 'Berguvsvägen  8',
    'City': 'Luleå',
    'PostalCode': 'S-958 22',
    'Country': 'Sweden',
    'Phone': '0921-12 34 65',
    'Fax': '0921-12 34 67'
  }, {
    'Id': 'BLAUS',
    'CompanyName': 'Blauer See Delikatessen',
    'ContactName': 'Hanna Moos',
    'ContactTitle': 'Sales Representative',
    'Address': 'Forsterstr. 57',
    'City': 'Mannheim',
    'PostalCode': '68306',
    'Country': 'Germany',
    'Phone': '0621-08460',
    'Fax': '0621-08924'
  }, {
    'Id': 'BLONP',
    'CompanyName': 'Blondesddsl père et fils',
    'ContactName': 'Frédérique Citeaux',
    'ContactTitle': 'Marketing Manager',
    'Address': '24, place Kléber',
    'City': 'Strasbourg',
    'PostalCode': '67000',
    'Country': 'France',
    'Phone': '88.60.15.31',
    'Fax': '88.60.15.32'
  }, {
    'Id': 'BOLID',
    'CompanyName': 'Bólido Comidas preparadas',
    'ContactName': 'Martín Sommer',
    'ContactTitle': 'Owner',
    'Address': 'C/ Araquil, 67',
    'City': 'Madrid',
    'PostalCode': '28023',
    'Country': 'Spain',
    'Phone': '(91) 555 22 82',
    'Fax': '(91) 555 91 99'
  }, {
    'Id': 'BONAP',
    'CompanyName': 'Bon app',
    'ContactName': 'Laurence Lebihan',
    'ContactTitle': 'Owner',
    'Address': '12, rue des Bouchers',
    'City': 'Marseille',
    'PostalCode': '13008',
    'Country': 'France',
    'Phone': '91.24.45.40',
    'Fax': '91.24.45.41'
  }, {
    'Id': 'BOTTM',
    'CompanyName': 'Bottom-Dollar Markets',
    'ContactName': 'Elizabeth Lincoln',
    'ContactTitle': 'Accounting Manager',
    'Address': '23 Tsawassen Blvd.',
    'City': 'Tsawassen',
    'Region': 'BC',
    'PostalCode': 'T2F 8M4',
    'Country': 'Canada',
    'Phone': '(604) 555-4729',
    'Fax': '(604) 555-3745'
  }, {
    'Id': 'BSBEV',
    'CompanyName': 'Bad Beverages',
    'ContactName': 'Victoria Ashworth',
    'ContactTitle': 'Sales Representative',
    'Address': 'Fauntleroy Circus',
    'City': 'London',
    'PostalCode': 'EC2 5NT',
    'Country': 'UK',
    'Phone': '(171) 555-1212'
  }, {
    'Id': 'CACTU',
    'CompanyName': 'Cactus Comidas para llevar',
    'ContactName': 'Patricio Simpson',
    'ContactTitle': 'Sales Agent',
    'Address': 'Cerrito 333',
    'City': 'Buenos Aires',
    'PostalCode': '1010',
    'Country': 'Argentina',
    'Phone': '(1) 135-5555',
    'Fax': '(1) 135-4892'
  }, {
    'Id': 'CENTC',
    'CompanyName': 'Centro comercial Moctezuma',
    'ContactName': 'Francisco Chang',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Sierras de Granada 9993',
    'City': 'México D.F.',
    'PostalCode': '05022',
    'Country': 'Mexico',
    'Phone': '(5) 555-3392',
    'Fax': '(5) 555-7293'
  }, {
    'Id': 'CHOPS',
    'CompanyName': 'Chop-suey Chinese',
    'ContactName': 'Yang Wang',
    'ContactTitle': 'Owner',
    'Address': 'Hauptstr. 29',
    'City': 'Bern',
    'PostalCode': '3012',
    'Country': 'Switzerland',
    'Phone': '0452-076545'
  }, {
    'Id': 'COMMI',
    'CompanyName': 'Comércio Mineiro',
    'ContactName': 'Pedro Afonso',
    'ContactTitle': 'Sales Associate',
    'Address': 'Av. dos Lusíadas, 23',
    'City': 'Sao Paulo',
    'Region': 'SP',
    'PostalCode': '05432-043',
    'Country': 'Brazil',
    'Phone': '(11) 555-7647'
  }, {
    'Id': 'CONSH',
    'CompanyName': 'Consolidated Holdings',
    'ContactName': 'Elizabeth Brown',
    'ContactTitle': 'Sales Representative',
    'Address': 'Berkeley Gardens 12  Brewery',
    'City': 'London',
    'PostalCode': 'WX1 6LT',
    'Country': 'UK',
    'Phone': '(171) 555-2282',
    'Fax': '(171) 555-9199'
  }, {
    'Id': 'DRACD',
    'CompanyName': 'Drachenblut Delikatessen',
    'ContactName': 'Sven Ottlieb',
    'ContactTitle': 'Order Administrator',
    'Address': 'Walserweg 21',
    'City': 'Aachen',
    'PostalCode': '52066',
    'Country': 'Germany',
    'Phone': '0241-039123',
    'Fax': '0241-059428'
  }, {
    'Id': 'DUMON',
    'CompanyName': 'Du monde entier',
    'ContactName': 'Janine Labrune',
    'ContactTitle': 'Owner',
    'Address': '67, rue des Cinquante Otages',
    'City': 'Nantes',
    'PostalCode': '44000',
    'Country': 'France',
    'Phone': '40.67.88.88',
    'Fax': '40.67.89.89'
  }, {
    'Id': 'EASTC',
    'CompanyName': 'Eastern Connection',
    'ContactName': 'Ann Devon',
    'ContactTitle': 'Sales Agent',
    'Address': '35 King George',
    'City': 'London',
    'PostalCode': 'WX3 6FW',
    'Country': 'UK',
    'Phone': '(171) 555-0297',
    'Fax': '(171) 555-3373'
  }, {
    'Id': 'ERNSH',
    'CompanyName': 'Ernst Handel',
    'ContactName': 'Roland Mendel',
    'ContactTitle': 'Sales Manager',
    'Address': 'Kirchgasse 6',
    'City': 'Graz',
    'PostalCode': '8010',
    'Country': 'Austria',
    'Phone': '7675-3425',
    'Fax': '7675-3426'
  }, {
    'Id': 'FAMIA',
    'CompanyName': 'Familia Arquibaldo',
    'ContactName': 'Aria Cruz',
    'ContactTitle': 'Marketing Assistant',
    'Address': 'Rua Orós, 92',
    'City': 'Sao Paulo',
    'Region': 'SP',
    'PostalCode': '05442-030',
    'Country': 'Brazil',
    'Phone': '(11) 555-9857'
  }, {
    'Id': 'FISSA',
    'CompanyName': 'FISSA Fabrica Inter. Salchichas S.A.',
    'ContactName': 'Diego Roel',
    'ContactTitle': 'Accounting Manager',
    'Address': 'C/ Moralzarzal, 86',
    'City': 'Madrid',
    'PostalCode': '28034',
    'Country': 'Spain',
    'Phone': '(91) 555 94 44',
    'Fax': '(91) 555 55 93'
  }, {
    'Id': 'FOLIG',
    'CompanyName': 'Folies gourmandes',
    'ContactName': 'Martine Rancé',
    'ContactTitle': 'Assistant Sales Agent',
    'Address': '184, chaussée de Tournai',
    'City': 'Lille',
    'PostalCode': '59000',
    'Country': 'France',
    'Phone': '20.16.10.16',
    'Fax': '20.16.10.17'
  }, {
    'Id': 'FOLKO',
    'CompanyName': 'Folk och fä HB',
    'ContactName': 'Maria Larsson',
    'ContactTitle': 'Owner',
    'Address': 'Åkergatan 24',
    'City': 'Bräcke',
    'PostalCode': 'S-844 67',
    'Country': 'Sweden',
    'Phone': '0695-34 67 21'
  }, {
    'Id': 'FRANK',
    'CompanyName': 'Frankenversand',
    'ContactName': 'Peter Franken',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Berliner Platz 43',
    'City': 'München',
    'PostalCode': '80805',
    'Country': 'Germany',
    'Phone': '089-0877310',
    'Fax': '089-0877451'
  }, {
    'Id': 'FRANR',
    'CompanyName': 'France restauration',
    'ContactName': 'Carine Schmitt',
    'ContactTitle': 'Marketing Manager',
    'Address': '54, rue Royale',
    'City': 'Nantes',
    'PostalCode': '44000',
    'Country': 'France',
    'Phone': '40.32.21.21',
    'Fax': '40.32.21.20'
  }, {
    'Id': 'FRANS',
    'CompanyName': 'Franchi S.p.A.',
    'ContactName': 'Paolo Accorti',
    'ContactTitle': 'Sales Representative',
    'Address': 'Via Monte Bianco 34',
    'City': 'Torino',
    'PostalCode': '10100',
    'Country': 'Italy',
    'Phone': '011-4988260',
    'Fax': '011-4988261'
  }, {
    'Id': 'FURIB',
    'CompanyName': 'Furia Bacalhau e Frutos do Mar',
    'ContactName': 'Lino Rodriguez',
    'ContactTitle': 'Sales Manager',
    'Address': 'Jardim das rosas n. 32',
    'City': 'Lisboa',
    'PostalCode': '1675',
    'Country': 'Portugal',
    'Phone': '(1) 354-2534',
    'Fax': '(1) 354-2535'
  }, {
    'Id': 'GALED',
    'CompanyName': 'Galería del gastrónomo',
    'ContactName': 'Eduardo Saavedra',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Rambla de Cataluña, 23',
    'City': 'Barcelona',
    'PostalCode': '08022',
    'Country': 'Spain',
    'Phone': '(93) 203 4560',
    'Fax': '(93) 203 4561'
  }, {
    'Id': 'GODOS',
    'CompanyName': 'Godos Cocina Típica',
    'ContactName': 'José Pedro Freyre',
    'ContactTitle': 'Sales Manager',
    'Address': 'C/ Romero, 33',
    'City': 'Sevilla',
    'PostalCode': '41101',
    'Country': 'Spain',
    'Phone': '(95) 555 82 82'
  }, {
    'Id': 'GOURL',
    'CompanyName': 'Gourmet Lanchonetes',
    'ContactName': 'André Fonseca',
    'ContactTitle': 'Sales Associate',
    'Address': 'Av. Brasil, 442',
    'City': 'Campinas',
    'Region': 'SP',
    'PostalCode': '04876-786',
    'Country': 'Brazil',
    'Phone': '(11) 555-9482'
  }, {
    'Id': 'GREAL',
    'CompanyName': 'Great Lakes Food Market',
    'ContactName': 'Howard Snyder',
    'ContactTitle': 'Marketing Manager',
    'Address': '2732 Baker Blvd.',
    'City': 'Eugene',
    'Region': 'OR',
    'PostalCode': '97403',
    'Country': 'USA',
    'Phone': '(503) 555-7555'
  }, {
    'Id': 'GROSR',
    'CompanyName': 'GROSELLA-Restaurante',
    'ContactName': 'Manuel Pereira',
    'ContactTitle': 'Owner',
    'Address': '5ª Ave. Los Palos Grandes',
    'City': 'Caracas',
    'Region': 'DF',
    'PostalCode': '1081',
    'Country': 'Venezuela',
    'Phone': '(2) 283-2951',
    'Fax': '(2) 283-3397'
  }, {
    'Id': 'HANAR',
    'CompanyName': 'Hanari Carnes',
    'ContactName': 'Mario Pontes',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Rua do Paço, 67',
    'City': 'Rio de Janeiro',
    'Region': 'RJ',
    'PostalCode': '05454-876',
    'Country': 'Brazil',
    'Phone': '(21) 555-0091',
    'Fax': '(21) 555-8765'
  }, {
    'Id': 'HILAA',
    'CompanyName': 'HILARION-Abastos',
    'ContactName': 'Carlos Hernández',
    'ContactTitle': 'Sales Representative',
    'Address': 'Carrera 22 con Ave. Carlos Soublette #8-35',
    'City': 'San Cristóbal',
    'Region': 'Táchira',
    'PostalCode': '5022',
    'Country': 'Venezuela',
    'Phone': '(5) 555-1340',
    'Fax': '(5) 555-1948'
  }, {
    'Id': 'HUNGC',
    'CompanyName': 'Hungry Coyote Import Store',
    'ContactName': 'Yoshi Latimer',
    'ContactTitle': 'Sales Representative',
    'Address': 'City Center Plaza 516 Main St.',
    'City': 'Elgin',
    'Region': 'OR',
    'PostalCode': '97827',
    'Country': 'USA',
    'Phone': '(503) 555-6874',
    'Fax': '(503) 555-2376'
  }, {
    'Id': 'HUNGO',
    'CompanyName': 'Hungry Owl All-Night Grocers',
    'ContactName': 'Patricia McKenna',
    'ContactTitle': 'Sales Associate',
    'Address': '8 Johnstown Road',
    'City': 'Cork',
    'Region': 'Co. Cork',
    'Country': 'Ireland',
    'Phone': '2967 542',
    'Fax': '2967 3333'
  }, {
    'Id': 'ISLAT',
    'CompanyName': 'Island Trading',
    'ContactName': 'Helen Bennett',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Garden House Crowther Way',
    'City': 'Cowes',
    'Region': 'Isle of Wight',
    'PostalCode': 'PO31 7PJ',
    'Country': 'UK',
    'Phone': '(198) 555-8888'
  }, {
    'Id': 'KOENE',
    'CompanyName': 'Königlich Essen',
    'ContactName': 'Philip Cramer',
    'ContactTitle': 'Sales Associate',
    'Address': 'Maubelstr. 90',
    'City': 'Brandenburg',
    'PostalCode': '14776',
    'Country': 'Germany',
    'Phone': '0555-09876'
  }, {
    'Id': 'LAUGB',
    'CompanyName': 'Laughing Bacchus Wine Cellars',
    'ContactName': 'Yoshi Tannamuri',
    'ContactTitle': 'Marketing Assistant',
    'Address': '1900 Oak St.',
    'City': 'Vancouver',
    'Region': 'BC',
    'PostalCode': 'V3F 2K1',
    'Country': 'Canada',
    'Phone': '(604) 555-3392',
    'Fax': '(604) 555-7293'
  }, {
    'Id': 'LAZYK',
    'CompanyName': 'Lazy K Kountry Store',
    'ContactName': 'John Steel',
    'ContactTitle': 'Marketing Manager',
    'Address': '12 Orchestra Terrace',
    'City': 'Walla Walla',
    'Region': 'WA',
    'PostalCode': '99362',
    'Country': 'USA',
    'Phone': '(509) 555-7969',
    'Fax': '(509) 555-6221'
  }, {
    'Id': 'LEHMS',
    'CompanyName': 'Lehmanns Marktstand',
    'ContactName': 'Renate Messner',
    'ContactTitle': 'Sales Representative',
    'Address': 'Magazinweg 7',
    'City': 'Frankfurt a.M.',
    'PostalCode': '60528',
    'Country': 'Germany',
    'Phone': '069-0245984',
    'Fax': '069-0245874'
  }, {
    'Id': 'LILAS',
    'CompanyName': 'LILA-Supermercado',
    'ContactName': 'Carlos González',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Carrera 52 con Ave. Bolívar #65-98 Llano Largo',
    'City': 'Barquisimeto',
    'Region': 'Lara',
    'PostalCode': '3508',
    'Country': 'Venezuela',
    'Phone': '(9) 331-6954',
    'Fax': '(9) 331-7256'
  }, {
    'Id': 'LINOD',
    'CompanyName': 'LINO-Delicateses',
    'ContactName': 'Felipe Izquierdo',
    'ContactTitle': 'Owner',
    'Address': 'Ave. 5 de Mayo Porlamar',
    'City': 'I. de Margarita',
    'Region': 'Nueva Esparta',
    'PostalCode': '4980',
    'Country': 'Venezuela',
    'Phone': '(8) 34-56-12',
    'Fax': '(8) 34-93-93'
  }, {
    'Id': 'LONEP',
    'CompanyName': 'Lonesome Pine Restaurant',
    'ContactName': 'Fran Wilson',
    'ContactTitle': 'Sales Manager',
    'Address': '89 Chiaroscuro Rd.',
    'City': 'Portland',
    'Region': 'OR',
    'PostalCode': '97219',
    'Country': 'USA',
    'Phone': '(503) 555-9573',
    'Fax': '(503) 555-9646'
  }, {
    'Id': 'MAGAA',
    'CompanyName': 'Magazzini Alimentari Riuniti',
    'ContactName': 'Giovanni Rovelli',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Via Ludovico il Moro 22',
    'City': 'Bergamo',
    'PostalCode': '24100',
    'Country': 'Italy',
    'Phone': '035-640230',
    'Fax': '035-640231'
  }, {
    'Id': 'MAISD',
    'CompanyName': 'Maison Dewey',
    'ContactName': 'Catherine Dewey',
    'ContactTitle': 'Sales Agent',
    'Address': 'Rue Joseph-Bens 532',
    'City': 'Bruxelles',
    'PostalCode': 'B-1180',
    'Country': 'Belgium',
    'Phone': '(02) 201 24 67',
    'Fax': '(02) 201 24 68'
  }, {
    'Id': 'MEREP',
    'CompanyName': 'Mère Paillarde',
    'ContactName': 'Jean Fresnière',
    'ContactTitle': 'Marketing Assistant',
    'Address': '43 rue St. Laurent',
    'City': 'Montréal',
    'Region': 'Québec',
    'PostalCode': 'H1J 1C3',
    'Country': 'Canada',
    'Phone': '(514) 555-8054',
    'Fax': '(514) 555-8055'
  }, {
    'Id': 'MORGK',
    'CompanyName': 'Morgenstern Gesundkost',
    'ContactName': 'Alexander Feuer',
    'ContactTitle': 'Marketing Assistant',
    'Address': 'Heerstr. 22',
    'City': 'Leipzig',
    'PostalCode': '04179',
    'Country': 'Germany',
    'Phone': '0342-023176'
  }, {
    'Id': 'NORTS',
    'CompanyName': 'North/South',
    'ContactName': 'Simon Crowther',
    'ContactTitle': 'Sales Associate',
    'Address': 'South House 300 Queensbridge',
    'City': 'London',
    'PostalCode': 'SW7 1RZ',
    'Country': 'UK',
    'Phone': '(171) 555-7733',
    'Fax': '(171) 555-2530'
  }, {
    'Id': 'OCEAN',
    'CompanyName': 'Océano Atlántico Ltda.',
    'ContactName': 'Yvonne Moncada',
    'ContactTitle': 'Sales Agent',
    'Address': 'Ing. Gustavo Moncada 8585 Piso 20-A',
    'City': 'Buenos Aires',
    'PostalCode': '1010',
    'Country': 'Argentina',
    'Phone': '(1) 135-5333',
    'Fax': '(1) 135-5535'
  }, {
    'Id': 'OLDWO',
    'CompanyName': 'Old World Delicatessen',
    'ContactName': 'Rene Phillips',
    'ContactTitle': 'Sales Representative',
    'Address': '2743 Bering St.',
    'City': 'Anchorage',
    'Region': 'AK',
    'PostalCode': '99508',
    'Country': 'USA',
    'Phone': '(907) 555-7584',
    'Fax': '(907) 555-2880'
  }, {
    'Id': 'OTTIK',
    'CompanyName': 'Ottilies Käseladen',
    'ContactName': 'Henriette Pfalzheim',
    'ContactTitle': 'Owner',
    'Address': 'Mehrheimerstr. 369',
    'City': 'Köln',
    'PostalCode': '50739',
    'Country': 'Germany',
    'Phone': '0221-0644327',
    'Fax': '0221-0765721'
  }, {
    'Id': 'PARIS',
    'CompanyName': 'Paris spécialités',
    'ContactName': 'Marie Bertrand',
    'ContactTitle': 'Owner',
    'Address': '265, boulevard Charonne',
    'City': 'Paris',
    'PostalCode': '75012',
    'Country': 'France',
    'Phone': '(1) 42.34.22.66',
    'Fax': '(1) 42.34.22.77'
  }, {
    'Id': 'PERIC',
    'CompanyName': 'Pericles Comidas clásicas',
    'ContactName': 'Guillermo Fernández',
    'ContactTitle': 'Sales Representative',
    'Address': 'Calle Dr. Jorge Cash 321',
    'City': 'México D.F.',
    'PostalCode': '05033',
    'Country': 'Mexico',
    'Phone': '(5) 552-3745',
    'Fax': '(5) 545-3745'
  }, {
    'Id': 'PICCO',
    'CompanyName': 'Piccolo und mehr',
    'ContactName': 'Georg Pipps',
    'ContactTitle': 'Sales Manager',
    'Address': 'Geislweg 14',
    'City': 'Salzburg',
    'PostalCode': '5020',
    'Country': 'Austria',
    'Phone': '6562-9722',
    'Fax': '6562-9723'
  }, {
    'Id': 'PRINI',
    'CompanyName': 'Princesa Isabel Vinhos',
    'ContactName': 'Isabel de Castro',
    'ContactTitle': 'Sales Representative',
    'Address': 'Estrada da saúde n. 58',
    'City': 'Lisboa',
    'PostalCode': '1756',
    'Country': 'Portugal',
    'Phone': '(1) 356-5634'
  }, {
    'Id': 'QUEDE',
    'CompanyName': 'Que Delícia',
    'ContactName': 'Bernardo Batista',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Rua da Panificadora, 12',
    'City': 'Rio de Janeiro',
    'Region': 'RJ',
    'PostalCode': '02389-673',
    'Country': 'Brazil',
    'Phone': '(21) 555-4252',
    'Fax': '(21) 555-4545'
  }, {
    'Id': 'QUEEN',
    'CompanyName': 'Queen Cozinha',
    'ContactName': 'Lúcia Carvalho',
    'ContactTitle': 'Marketing Assistant',
    'Address': 'Alameda dos Canàrios, 891',
    'City': 'Sao Paulo',
    'Region': 'SP',
    'PostalCode': '05487-020',
    'Country': 'Brazil',
    'Phone': '(11) 555-1189'
  }, {
    'Id': 'QUICK',
    'CompanyName': 'QUICK-Stop',
    'ContactName': 'Horst Kloss',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Taucherstraße 10',
    'City': 'Cunewalde',
    'PostalCode': '01307',
    'Country': 'Germany',
    'Phone': '0372-035188'
  }, {
    'Id': 'RANCH',
    'CompanyName': 'Rancho grande',
    'ContactName': 'Sergio Gutiérrez',
    'ContactTitle': 'Sales Representative',
    'Address': 'Av. del Libertador 900',
    'City': 'Buenos Aires',
    'PostalCode': '1010',
    'Country': 'Argentina',
    'Phone': '(1) 123-5555',
    'Fax': '(1) 123-5556'
  }, {
    'Id': 'RATTC',
    'CompanyName': 'Rattlesnake Canyon Grocery',
    'ContactName': 'Paula Wilson',
    'ContactTitle': 'Assistant Sales Representative',
    'Address': '2817 Milton Dr.',
    'City': 'Albuquerque',
    'Region': 'NM',
    'PostalCode': '87110',
    'Country': 'USA',
    'Phone': '(505) 555-5939',
    'Fax': '(505) 555-3620'
  }, {
    'Id': 'REGGC',
    'CompanyName': 'Reggiani Caseifici',
    'ContactName': 'Maurizio Moroni',
    'ContactTitle': 'Sales Associate',
    'Address': 'Strada Provinciale 124',
    'City': 'Reggio Emilia',
    'PostalCode': '42100',
    'Country': 'Italy',
    'Phone': '0522-556721',
    'Fax': '0522-556722'
  }, {
    'Id': 'RICAR',
    'CompanyName': 'Ricardo Adocicados',
    'ContactName': 'Janete Limeira',
    'ContactTitle': 'Assistant Sales Agent',
    'Address': 'Av. Copacabana, 267',
    'City': 'Rio de Janeiro',
    'Region': 'RJ',
    'PostalCode': '02389-890',
    'Country': 'Brazil',
    'Phone': '(21) 555-3412'
  }, {
    'Id': 'RICSU',
    'CompanyName': 'Richter Supermarkt',
    'ContactName': 'Michael Holz',
    'ContactTitle': 'Sales Manager',
    'Address': 'Grenzacherweg 237',
    'City': 'Genève',
    'PostalCode': '1203',
    'Country': 'Switzerland',
    'Phone': '0897-034214'
  }, {
    'Id': 'ROMEY',
    'CompanyName': 'Romero y tomillo',
    'ContactName': 'Alejandra Camino',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Gran Vía, 1',
    'City': 'Madrid',
    'PostalCode': '28001',
    'Country': 'Spain',
    'Phone': '(91) 745 6200',
    'Fax': '(91) 745 6210'
  }, {
    'Id': 'SANTG',
    'CompanyName': 'Santé Gourmet',
    'ContactName': 'Jonas Bergulfsen',
    'ContactTitle': 'Owner',
    'Address': 'Erling Skakkes gate 78',
    'City': 'Stavern',
    'PostalCode': '4110',
    'Country': 'Norway',
    'Phone': '07-98 92 35',
    'Fax': '07-98 92 47'
  }, {
    'Id': 'SAVEA',
    'CompanyName': 'Save-a-lot Markets',
    'ContactName': 'Jose Pavarotti',
    'ContactTitle': 'Sales Representative',
    'Address': '187 Suffolk Ln.',
    'City': 'Boise',
    'Region': 'ID',
    'PostalCode': '83720',
    'Country': 'USA',
    'Phone': '(208) 555-8097'
  }, {
    'Id': 'SEVES',
    'CompanyName': 'Seven Seas Imports',
    'ContactName': 'Hari Kumar',
    'ContactTitle': 'Sales Manager',
    'Address': '90 Wadhurst Rd.',
    'City': 'London',
    'PostalCode': 'OX15 4NB',
    'Country': 'UK',
    'Phone': '(171) 555-1717',
    'Fax': '(171) 555-5646'
  }, {
    'Id': 'SIMOB',
    'CompanyName': 'Simons bistro',
    'ContactName': 'Jytte Petersen',
    'ContactTitle': 'Owner',
    'Address': 'Vinbæltet 34',
    'City': 'Kobenhavn',
    'PostalCode': '1734',
    'Country': 'Denmark',
    'Phone': '31 12 34 56',
    'Fax': '31 13 35 57'
  }, {
    'Id': 'SPECD',
    'CompanyName': 'Spécialités du monde',
    'ContactName': 'Dominique Perrier',
    'ContactTitle': 'Marketing Manager',
    'Address': '25, rue Lauriston',
    'City': 'Paris',
    'PostalCode': '75016',
    'Country': 'France',
    'Phone': '(1) 47.55.60.10',
    'Fax': '(1) 47.55.60.20'
  }, {
    'Id': 'SPLIR',
    'CompanyName': 'Split Rail Beer & Ale',
    'ContactName': 'Art Braunschweiger',
    'ContactTitle': 'Sales Manager',
    'Address': 'P.O. Box 555',
    'City': 'Lander',
    'Region': 'WY',
    'PostalCode': '82520',
    'Country': 'USA',
    'Phone': '(307) 555-4680',
    'Fax': '(307) 555-6525'
  }, {
    'Id': 'SUPRD',
    'CompanyName': 'Suprêmes délices',
    'ContactName': 'Pascale Cartrain',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Boulevard Tirou, 255',
    'City': 'Charleroi',
    'PostalCode': 'B-6000',
    'Country': 'Belgium',
    'Phone': '(071) 23 67 22 20',
    'Fax': '(071) 23 67 22 21'
  }, {
    'Id': 'THEBI',
    'CompanyName': 'The Big Cheese',
    'ContactName': 'Liz Nixon',
    'ContactTitle': 'Marketing Manager',
    'Address': '89 Jefferson Way Suite 2',
    'City': 'Portland',
    'Region': 'OR',
    'PostalCode': '97201',
    'Country': 'USA',
    'Phone': '(503) 555-3612'
  }, {
    'Id': 'THECR',
    'CompanyName': 'The Cracker Box',
    'ContactName': 'Liu Wong',
    'ContactTitle': 'Marketing Assistant',
    'Address': '55 Grizzly Peak Rd.',
    'City': 'Butte',
    'Region': 'MT',
    'PostalCode': '59801',
    'Country': 'USA',
    'Phone': '(406) 555-5834',
    'Fax': '(406) 555-8083'
  }, {
    'Id': 'TOMSP',
    'CompanyName': 'Toms Spezialitäten',
    'ContactName': 'Karin Josephs',
    'ContactTitle': 'Marketing Manager',
    'Address': 'Luisenstr. 48',
    'City': 'Münster',
    'PostalCode': '44087',
    'Country': 'Germany',
    'Phone': '0251-031259',
    'Fax': '0251-035695'
  }, {
    'Id': 'TORTU',
    'CompanyName': 'Tortuga Restaurante',
    'ContactName': 'Miguel Angel Paolino',
    'ContactTitle': 'Owner',
    'Address': 'Avda. Azteca 123',
    'City': 'México D.F.',
    'PostalCode': '05033',
    'Country': 'Mexico',
    'Phone': '(5) 555-2933'
  }, {
    'Id': 'TRADH',
    'CompanyName': 'Tradição Hipermercados',
    'ContactName': 'Anabela Domingues',
    'ContactTitle': 'Sales Representative',
    'Address': 'Av. Inês de Castro, 414',
    'City': 'Sao Paulo',
    'Region': 'SP',
    'PostalCode': '05634-030',
    'Country': 'Brazil',
    'Phone': '(11) 555-2167',
    'Fax': '(11) 555-2168'
  }, {
    'Id': 'VAFFE',
    'CompanyName': 'Vaffeljernet',
    'ContactName': 'Palle Ibsen',
    'ContactTitle': 'Sales Manager',
    'Address': 'Smagsloget 45',
    'City': 'Århus',
    'PostalCode': '8200',
    'Country': 'Denmark',
    'Phone': '86 21 32 43',
    'Fax': '86 22 33 44'
  }, {
    'Id': 'VICTE',
    'CompanyName': 'Victuailles en stock',
    'ContactName': 'Mary Saveley',
    'ContactTitle': 'Sales Agent',
    'Address': '2, rue du Commerce',
    'City': 'Lyon',
    'PostalCode': '69004',
    'Country': 'France',
    'Phone': '78.32.54.86',
    'Fax': '78.32.54.87'
  }, {
    'Id': 'WANDK',
    'CompanyName': 'Die Wandernde Kuh',
    'ContactName': 'Rita Müller',
    'ContactTitle': 'Sales Representative',
    'Address': 'Adenauerallee 900',
    'City': 'Stuttgart',
    'PostalCode': '70563',
    'Country': 'Germany',
    'Phone': '0711-020361',
    'Fax': '0711-035428'
  }, {
    'Id': 'WARTH',
    'CompanyName': 'Wartian Herkku',
    'ContactName': 'Pirkko Koskitalo',
    'ContactTitle': 'Accounting Manager',
    'Address': 'Torikatu 38',
    'City': 'Oulu',
    'PostalCode': '90110',
    'Country': 'Finland',
    'Phone': '981-443655',
    'Fax': '981-443655'
  }, {
    'Id': 'WELLI',
    'CompanyName': 'Wellington Importadora',
    'ContactName': 'Paula Parente',
    'ContactTitle': 'Sales Manager',
    'Address': 'Rua do Mercado, 12',
    'City': 'Resende',
    'Region': 'SP',
    'PostalCode': '08737-363',
    'Country': 'Brazil',
    'Phone': '(14) 555-8122'
  }, {
    'Id': 'WHITC',
    'CompanyName': 'White Clover Markets',
    'ContactName': 'Karl Jablonski',
    'ContactTitle': 'Owner',
    'Address': '305 - 14th Ave. S. Suite 3B',
    'City': 'Seattle',
    'Region': 'WA',
    'PostalCode': '98128',
    'Country': 'USA',
    'Phone': '(206) 555-4112',
    'Fax': '(206) 555-4115'
  }, {
    'Id': 'WILMK',
    'CompanyName': 'Wilman Kala',
    'ContactName': 'Matti Karttunen',
    'ContactTitle': 'Owner/Marketing Assistant',
    'Address': 'Keskuskatu 45',
    'City': 'Helsinki',
    'PostalCode': '21240',
    'Country': 'Finland',
    'Phone': '90-224 8858',
    'Fax': '90-224 8858'
  }, {
    'Id': 'WOLZA',
    'CompanyName': 'Wolski  Zajazd',
    'ContactName': 'Zbyszek Piestrzeniewicz',
    'ContactTitle': 'Owner',
    'Address': 'ul. Filtrowa 68',
    'City': 'Warszawa',
    'PostalCode': '01-012',
    'Country': 'Poland',
    'Phone': '(26) 642-7012',
    'Fax': '(26) 642-7012'
  }];

  constructor() { }

  ngOnInit() {
    this.load();
    this.subscribe();
  }

  load() {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    };
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.load();
  }

  subscribe() {
    this.resize.subscribe((value) => {
      if (!_.isEmpty(value) && value.item.name === this.name) {
        this.redraw(value.height);
      }
    });
  }

  redraw(height: number) {
    this.height = height;
  }
}