'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, User, MapPin, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Comprehensive list of countries and their major cities with airports
const locations = [
  // Morocco (primary focus)
  { city: 'Casablanca', country: 'Morocco', code: 'CMN' },
  { city: 'Rabat', country: 'Morocco', code: 'RBA' },
  { city: 'Marrakech', country: 'Morocco', code: 'RAK' },
  { city: 'Fès', country: 'Morocco', code: 'FEZ' },
  { city: 'Tangier', country: 'Morocco', code: 'TNG' },
  { city: 'Agadir', country: 'Morocco', code: 'AGA' },
  { city: 'Oujda', country: 'Morocco', code: 'OUD' },
  { city: 'Khouribga', country: 'Morocco', code: 'XBJ' },
  { city: 'Meknès', country: 'Morocco', code: 'MEK' },
  { city: 'El Jadida', country: 'Morocco', code: 'EJA' },

  // Saudi Arabia (Hajj/Umrah destinations)
  { city: 'Mecca', country: 'Saudi Arabia', code: 'JED' },
  { city: 'Medina', country: 'Saudi Arabia', code: 'MED' },
  { city: 'Riyadh', country: 'Saudi Arabia', code: 'RUH' },
  { city: 'Jeddah', country: 'Saudi Arabia', code: 'JED' },
  { city: 'Dammam', country: 'Saudi Arabia', code: 'DMM' },
  { city: 'Taif', country: 'Saudi Arabia', code: 'TIF' },
  { city: 'Khobar', country: 'Saudi Arabia', code: 'KHO' },

  // Russia and Eastern Europe
  { city: 'Moscow', country: 'Russia', code: 'SVO' },
  { city: 'Saint Petersburg', country: 'Russia', code: 'LED' },
  { city: 'Novosibirsk', country: 'Russia', code: 'OVB' },
  { city: 'Yekaterinburg', country: 'Russia', code: 'SVX' },
  { city: 'Kazan', country: 'Russia', code: 'KZN' },
  { city: 'Chelyabinsk', country: 'Russia', code: 'CEK' },
  { city: 'Omsk', country: 'Russia', code: 'OMS' },
  { city: 'Samara', country: 'Russia', code: 'KUF' },
  { city: 'Ufa', country: 'Russia', code: 'UFA' },
  { city: 'Krasnoyarsk', country: 'Russia', code: 'KJA' },
  { city: 'Voronezh', country: 'Russia', code: 'VOZ' },
  { city: 'Volgograd', country: 'Russia', code: 'VOG' },
  { city: 'Krasnodar', country: 'Russia', code: 'KRR' },
  { city: 'Saratov', country: 'Russia', code: 'RTW' },
  { city: 'Tyumen', country: 'Russia', code: 'TJM' },
  { city: 'Izhevsk', country: 'Russia', code: 'IJK' },
  { city: 'Vladivostok', country: 'Russia', code: 'VVO' },
  { city: 'Irkutsk', country: 'Russia', code: 'IKT' },
  { city: 'Khabarovsk', country: 'Russia', code: 'KHV' },
  { city: 'Novgorod', country: 'Russia', code: 'NVR' },

  // Ukraine
  { city: 'Kyiv', country: 'Ukraine', code: 'KBP' },
  { city: 'Kharkiv', country: 'Ukraine', code: 'HRK' },
  { city: 'Odesa', country: 'Ukraine', code: 'ODS' },
  { city: 'Dnipro', country: 'Ukraine', code: 'DNK' },
  { city: 'Donetsk', country: 'Ukraine', code: 'DOK' },
  { city: 'Zaporizhzhia', country: 'Ukraine', code: 'OZH' },
  { city: 'Lviv', country: 'Ukraine', code: 'LWO' },
  { city: 'Kryvyi Rih', country: 'Ukraine', code: 'KWG' },
  { city: 'Sevastopol', country: 'Ukraine', code: 'UKS' },
  { city: 'Mykolaiv', country: 'Ukraine', code: 'NLV' },

  // Kazakhstan
  { city: 'Almaty', country: 'Kazakhstan', code: 'ALA' },
  { city: 'Nur-Sultan', country: 'Kazakhstan', code: 'NQZ' },
  { city: 'Shymkent', country: 'Kazakhstan', code: 'CIT' },
  { city: 'Karaganda', country: 'Kazakhstan', code: 'KGF' },
  { city: 'Aktobe', country: 'Kazakhstan', code: 'AKX' },
  { city: 'Taraz', country: 'Kazakhstan', code: 'DMB' },
  { city: 'Pavlodar', country: 'Kazakhstan', code: 'PWQ' },
  { city: 'Ust-Kamenogorsk', country: 'Kazakhstan', code: 'UKK' },
  { city: 'Semey', country: 'Kazakhstan', code: 'PLX' },
  { city: 'Atyrau', country: 'Kazakhstan', code: 'GUW' },

  // Uzbekistan
  { city: 'Tashkent', country: 'Uzbekistan', code: 'TAS' },
  { city: 'Samarkand', country: 'Uzbekistan', code: 'SKD' },
  { city: 'Bukhara', country: 'Uzbekistan', code: 'BHK' },
  { city: 'Andijan', country: 'Uzbekistan', code: 'AZN' },
  { city: 'Namangan', country: 'Uzbekistan', code: 'NMA' },
  { city: 'Fergana', country: 'Uzbekistan', code: 'FEG' },
  { city: 'Urgench', country: 'Uzbekistan', code: 'UGC' },
  { city: 'Termez', country: 'Uzbekistan', code: 'TMJ' },
  { city: 'Qarshi', country: 'Uzbekistan', code: 'KSQ' },
  { city: 'Nukus', country: 'Uzbekistan', code: 'NCU' },

  // Central Asia
  { city: 'Bishkek', country: 'Kyrgyzstan', code: 'FRU' },
  { city: 'Osh', country: 'Kyrgyzstan', code: 'OSS' },
  { city: 'Dushanbe', country: 'Tajikistan', code: 'DYU' },
  { city: 'Khujand', country: 'Tajikistan', code: 'LBD' },
  { city: 'Ashgabat', country: 'Turkmenistan', code: 'ASB' },
  { city: 'Turkmenabat', country: 'Turkmenistan', code: 'CRZ' },

  // Baltic States
  { city: 'Riga', country: 'Latvia', code: 'RIX' },
  { city: 'Tallinn', country: 'Estonia', code: 'TLL' },
  { city: 'Vilnius', country: 'Lithuania', code: 'VNO' },

  // Balkans
  { city: 'Belgrade', country: 'Serbia', code: 'BEG' },
  { city: 'Zagreb', country: 'Croatia', code: 'ZAG' },
  { city: 'Sarajevo', country: 'Bosnia and Herzegovina', code: 'SJJ' },
  { city: 'Skopje', country: 'North Macedonia', code: 'SKP' },
  { city: 'Podgorica', country: 'Montenegro', code: 'TGD' },
  { city: 'Tirana', country: 'Albania', code: 'TIA' },
  { city: 'Pristina', country: 'Kosovo', code: 'PRN' },
  { city: 'Sofia', country: 'Bulgaria', code: 'SOF' },
  { city: 'Bucharest', country: 'Romania', code: 'OTP' },
  { city: 'Chisinau', country: 'Moldova', code: 'KIV' },

  // Caucasus
  { city: 'Tbilisi', country: 'Georgia', code: 'TBS' },
  { city: 'Yerevan', country: 'Armenia', code: 'EVN' },
  { city: 'Baku', country: 'Azerbaijan', code: 'GYD' },

  // Scandinavian countries
  { city: 'Stockholm', country: 'Sweden', code: 'ARN' },
  { city: 'Oslo', country: 'Norway', code: 'OSL' },
  { city: 'Copenhagen', country: 'Denmark', code: 'CPH' },
  { city: 'Helsinki', country: 'Finland', code: 'HEL' },
  { city: 'Reykjavik', country: 'Iceland', code: 'KEF' },

  // Major European countries
  { city: 'Paris', country: 'France', code: 'CDG' },
  { city: 'London', country: 'United Kingdom', code: 'LHR' },
  { city: 'Rome', country: 'Italy', code: 'FCO' },
  { city: 'Madrid', country: 'Spain', code: 'MAD' },
  { city: 'Berlin', country: 'Germany', code: 'BER' },
  { city: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
  { city: 'Barcelona', country: 'Spain', code: 'BCN' },
  { city: 'Milan', country: 'Italy', code: 'MXP' },
  { city: 'Frankfurt', country: 'Germany', code: 'FRA' },
  { city: 'Zurich', country: 'Switzerland', code: 'ZRH' },
  { city: 'Vienna', country: 'Austria', code: 'VIE' },
  { city: 'Prague', country: 'Czech Republic', code: 'PRG' },
  { city: 'Warsaw', country: 'Poland', code: 'WAW' },
  { city: 'Budapest', country: 'Hungary', code: 'BUD' },
  { city: 'Athens', country: 'Greece', code: 'ATH' },
  { city: 'Lisbon', country: 'Portugal', code: 'LIS' },
  { city: 'Dublin', country: 'Ireland', code: 'DUB' },
  { city: 'Edinburgh', country: 'United Kingdom', code: 'EDI' },
  { city: 'Manchester', country: 'United Kingdom', code: 'MAN' },
  { city: 'Munich', country: 'Germany', code: 'MUC' },
  { city: 'Brussels', country: 'Belgium', code: 'BRU' },
  { city: 'Geneva', country: 'Switzerland', code: 'GVA' },
  { city: 'Luxembourg', country: 'Luxembourg', code: 'LUX' },
  { city: 'Ljubljana', country: 'Slovenia', code: 'LJU' },
  { city: 'Bratislava', country: 'Slovakia', code: 'BTS' },

  // Middle East
  { city: 'Dubai', country: 'UAE', code: 'DXB' },
  { city: 'Abu Dhabi', country: 'UAE', code: 'AUH' },
  { city: 'Sharjah', country: 'UAE', code: 'SHJ' },
  { city: 'Doha', country: 'Qatar', code: 'DOH' },
  { city: 'Kuwait City', country: 'Kuwait', code: 'KWI' },
  { city: 'Muscat', country: 'Oman', code: 'MCT' },
  { city: 'Manama', country: 'Bahrain', code: 'BAH' },
  { city: 'Tel Aviv', country: 'Israel', code: 'TLV' },
  { city: 'Amman', country: 'Jordan', code: 'AMM' },
  { city: 'Beirut', country: 'Lebanon', code: 'BEY' },
  { city: 'Damascus', country: 'Syria', code: 'DAM' },
  { city: 'Baghdad', country: 'Iraq', code: 'BGW' },

  // North America
  { city: 'New York', country: 'USA', code: 'JFK' },
  { city: 'Los Angeles', country: 'USA', code: 'LAX' },
  { city: 'Chicago', country: 'USA', code: 'ORD' },
  { city: 'Houston', country: 'USA', code: 'IAH' },
  { city: 'Phoenix', country: 'USA', code: 'PHX' },
  { city: 'Philadelphia', country: 'USA', code: 'PHL' },
  { city: 'San Antonio', country: 'USA', code: 'SAT' },
  { city: 'San Diego', country: 'USA', code: 'SAN' },
  { city: 'Dallas', country: 'USA', code: 'DFW' },
  { city: 'San Jose', country: 'USA', code: 'SJC' },
  { city: 'Austin', country: 'USA', code: 'AUS' },
  { city: 'Jacksonville', country: 'USA', code: 'JAX' },
  { city: 'Fort Worth', country: 'USA', code: 'FTW' },
  { city: 'Columbus', country: 'USA', code: 'CMH' },
  { city: 'Charlotte', country: 'USA', code: 'CLT' },
  { city: 'San Francisco', country: 'USA', code: 'SFO' },
  { city: 'Indianapolis', country: 'USA', code: 'IND' },
  { city: 'Seattle', country: 'USA', code: 'SEA' },
  { city: 'Denver', country: 'USA', code: 'DEN' },
  { city: 'Boston', country: 'USA', code: 'BOS' },
  { city: 'El Paso', country: 'USA', code: 'ELP' },
  { city: 'Nashville', country: 'USA', code: 'BNA' },
  { city: 'Detroit', country: 'USA', code: 'DTW' },
  { city: 'Oklahoma City', country: 'USA', code: 'OKC' },
  { city: 'Portland', country: 'USA', code: 'PDX' },
  { city: 'Las Vegas', country: 'USA', code: 'LAS' },
  { city: 'Memphis', country: 'USA', code: 'MEM' },
  { city: 'Louisville', country: 'USA', code: 'SDF' },
  { city: 'Baltimore', country: 'USA', code: 'BWI' },
  { city: 'Milwaukee', country: 'USA', code: 'MKE' },
  { city: 'Albuquerque', country: 'USA', code: 'ABQ' },
  { city: 'Tucson', country: 'USA', code: 'TUS' },
  { city: 'Fresno', country: 'USA', code: 'FAT' },
  { city: 'Mesa', country: 'USA', code: 'AZA' },
  { city: 'Sacramento', country: 'USA', code: 'SMF' },
  { city: 'Atlanta', country: 'USA', code: 'ATL' },
  { city: 'Kansas City', country: 'USA', code: 'MCI' },
  { city: 'Colorado Springs', country: 'USA', code: 'COS' },
  { city: 'Miami', country: 'USA', code: 'MIA' },
  { city: 'Raleigh', country: 'USA', code: 'RDU' },
  { city: 'Omaha', country: 'USA', code: 'OMA' },
  { city: 'Long Beach', country: 'USA', code: 'LGB' },
  { city: 'Virginia Beach', country: 'USA', code: 'ORF' },
  { city: 'Oakland', country: 'USA', code: 'OAK' },
  { city: 'Minneapolis', country: 'USA', code: 'MSP' },
  { city: 'Tulsa', country: 'USA', code: 'TUL' },
  { city: 'Arlington', country: 'USA', code: 'DFW' },
  { city: 'New Orleans', country: 'USA', code: 'MSY' },
  { city: 'Wichita', country: 'USA', code: 'ICT' },
  { city: 'Cleveland', country: 'USA', code: 'CLE' },
  { city: 'Tampa', country: 'USA', code: 'TPA' },
  { city: 'Bakersfield', country: 'USA', code: 'BFL' },
  { city: 'Aurora', country: 'USA', code: 'AUR' },
  { city: 'Anaheim', country: 'USA', code: 'ANA' },
  { city: 'Honolulu', country: 'USA', code: 'HNL' },
  { city: 'Corpus Christi', country: 'USA', code: 'CRP' },
  { city: 'Riverside', country: 'USA', code: 'RIV' },
  { city: 'Lexington', country: 'USA', code: 'LEX' },
  { city: 'Stockton', country: 'USA', code: 'SCK' },
  { city: 'Henderson', country: 'USA', code: 'HND' },
  { city: 'Saint Paul', country: 'USA', code: 'STP' },
  { city: 'St. Louis', country: 'USA', code: 'STL' },
  { city: 'Cincinnati', country: 'USA', code: 'CVG' },
  { city: 'Pittsburgh', country: 'USA', code: 'PIT' },
  { city: 'Greensboro', country: 'USA', code: 'GSO' },
  { city: 'Anchorage', country: 'USA', code: 'ANC' },
  { city: 'Plano', country: 'USA', code: 'PLN' },
  { city: 'Lincoln', country: 'USA', code: 'LNK' },
  { city: 'Orlando', country: 'USA', code: 'MCO' },
  { city: 'Irvine', country: 'USA', code: 'IRV' },
  { city: 'Newark', country: 'USA', code: 'EWR' },
  { city: 'Durham', country: 'USA', code: 'RDU' },
  { city: 'Chula Vista', country: 'USA', code: 'CVS' },
  { city: 'Toledo', country: 'USA', code: 'TOL' },
  { city: 'Fort Wayne', country: 'USA', code: 'FWA' },
  { city: 'St. Petersburg', country: 'USA', code: 'PIE' },
  { city: 'Laredo', country: 'USA', code: 'LRD' },
  { city: 'Jersey City', country: 'USA', code: 'JER' },
  { city: 'Chandler', country: 'USA', code: 'CHA' },
  { city: 'Madison', country: 'USA', code: 'MSN' },
  { city: 'Lubbock', country: 'USA', code: 'LBB' },
  { city: 'Scottsdale', country: 'USA', code: 'SCF' },
  { city: 'Reno', country: 'USA', code: 'RNO' },
  { city: 'Buffalo', country: 'USA', code: 'BUF' },
  { city: 'Gilbert', country: 'USA', code: 'GIL' },
  { city: 'Glendale', country: 'USA', code: 'GLN' },
  { city: 'North Las Vegas', country: 'USA', code: 'LAS' },
  { city: 'Winston-Salem', country: 'USA', code: 'INT' },
  { city: 'Chesapeake', country: 'USA', code: 'ORF' },
  { city: 'Norfolk', country: 'USA', code: 'ORF' },
  { city: 'Fremont', country: 'USA', code: 'FRE' },
  { city: 'Garland', country: 'USA', code: 'GAR' },
  { city: 'Irving', country: 'USA', code: 'IRV' },
  { city: 'Hialeah', country: 'USA', code: 'HIA' },
  { city: 'Richmond', country: 'USA', code: 'RIC' },
  { city: 'Boise', country: 'USA', code: 'BOI' },
  { city: 'Spokane', country: 'USA', code: 'GEG' },

  // Canada
  { city: 'Toronto', country: 'Canada', code: 'YYZ' },
  { city: 'Montreal', country: 'Canada', code: 'YUL' },
  { city: 'Vancouver', country: 'Canada', code: 'YVR' },
  { city: 'Calgary', country: 'Canada', code: 'YYC' },
  { city: 'Edmonton', country: 'Canada', code: 'YEG' },
  { city: 'Ottawa', country: 'Canada', code: 'YOW' },
  { city: 'Winnipeg', country: 'Canada', code: 'YWG' },
  { city: 'Quebec City', country: 'Canada', code: 'YQB' },
  { city: 'Hamilton', country: 'Canada', code: 'YHM' },
  { city: 'Kitchener', country: 'Canada', code: 'YKF' },

  // Mexico
  { city: 'Mexico City', country: 'Mexico', code: 'MEX' },
  { city: 'Guadalajara', country: 'Mexico', code: 'GDL' },
  { city: 'Monterrey', country: 'Mexico', code: 'MTY' },
  { city: 'Puebla', country: 'Mexico', code: 'PBC' },
  { city: 'Tijuana', country: 'Mexico', code: 'TIJ' },
  { city: 'León', country: 'Mexico', code: 'BJX' },
  { city: 'Juárez', country: 'Mexico', code: 'CJS' },
  { city: 'Torreón', country: 'Mexico', code: 'TRC' },
  { city: 'Querétaro', country: 'Mexico', code: 'QRO' },
  { city: 'Mérida', country: 'Mexico', code: 'MID' },

  // Central America and Caribbean
  { city: 'Guatemala City', country: 'Guatemala', code: 'GUA' },
  { city: 'San Salvador', country: 'El Salvador', code: 'SAL' },
  { city: 'Tegucigalpa', country: 'Honduras', code: 'TGU' },
  { city: 'Managua', country: 'Nicaragua', code: 'MGA' },
  { city: 'San José', country: 'Costa Rica', code: 'SJO' },
  { city: 'Panama City', country: 'Panama', code: 'PTY' },
  { city: 'Havana', country: 'Cuba', code: 'HAV' },
  { city: 'Santo Domingo', country: 'Dominican Republic', code: 'SDQ' },
  { city: 'Port-au-Prince', country: 'Haiti', code: 'PAP' },
  { city: 'Kingston', country: 'Jamaica', code: 'KIN' },
  { city: 'Nassau', country: 'Bahamas', code: 'NAS' },
  { city: 'Bridgetown', country: 'Barbados', code: 'BGI' },
  { city: 'Castries', country: 'Saint Lucia', code: 'UVF' },
  { city: 'Port of Spain', country: 'Trinidad and Tobago', code: 'POS' },
  { city: 'Saint John\'s', country: 'Antigua and Barbuda', code: 'ANU' },

  // Asia
  { city: 'Tokyo', country: 'Japan', code: 'NRT' },
  { city: 'Osaka', country: 'Japan', code: 'KIX' },
  { city: 'Kyoto', country: 'Japan', code: 'UKB' },
  { city: 'Yokohama', country: 'Japan', code: 'HND' },
  { city: 'Sapporo', country: 'Japan', code: 'CTS' },
  { city: 'Nagoya', country: 'Japan', code: 'NGO' },
  { city: 'Fukuoka', country: 'Japan', code: 'FUK' },
  { city: 'Kobe', country: 'Japan', code: 'UKB' },
  { city: 'Kawasaki', country: 'Japan', code: 'HND' },
  { city: 'Saitama', country: 'Japan', code: 'NRT' },
  { city: 'Hiroshima', country: 'Japan', code: 'HIJ' },
  { city: 'Sendai', country: 'Japan', code: 'SDJ' },
  { city: 'Chiba', country: 'Japan', code: 'NRT' },
  { city: 'Kitakyushu', country: 'Japan', code: 'KKJ' },
  { city: 'Sakai', country: 'Japan', code: 'KIX' },
  { city: 'Niigata', country: 'Japan', code: 'KIJ' },
  { city: 'Hamamatsu', country: 'Japan', code: 'FSZ' },
  { city: 'Okayama', country: 'Japan', code: 'OKJ' },
  { city: 'Kumamoto', country: 'Japan', code: 'KMJ' },
  { city: 'Shizuoka', country: 'Japan', code: 'FSZ' },

  { city: 'Istanbul', country: 'Turkey', code: 'IST' },
  { city: 'Ankara', country: 'Turkey', code: 'ESB' },
  { city: 'Izmir', country: 'Turkey', code: 'ADB' },
  { city: 'Bursa', country: 'Turkey', code: 'BTZ' },
  { city: 'Antalya', country: 'Turkey', code: 'AYT' },
  { city: 'Konya', country: 'Turkey', code: 'KYA' },
  { city: 'Adana', country: 'Turkey', code: 'ADA' },
  { city: 'Gaziantep', country: 'Turkey', code: 'GZT' },
  { city: 'Diyarbakir', country: 'Turkey', code: 'DIY' },
  { city: 'Mersin', country: 'Turkey', code: 'MER' },

  { city: 'Bangalore', country: 'India', code: 'BLR' },
  { city: 'Mumbai', country: 'India', code: 'BOM' },
  { city: 'Delhi', country: 'India', code: 'DEL' },
  { city: 'Kolkata', country: 'India', code: 'CCU' },
  { city: 'Chennai', country: 'India', code: 'MAA' },
  { city: 'Ahmedabad', country: 'India', code: 'AMD' },
  { city: 'Hyderabad', country: 'India', code: 'HYD' },
  { city: 'Pune', country: 'India', code: 'PNQ' },
  { city: 'Surat', country: 'India', code: 'STV' },
  { city: 'Jaipur', country: 'India', code: 'JAI' },
  { city: 'Kanpur', country: 'India', code: 'KNU' },
  { city: 'Nagpur', country: 'India', code: 'NAG' },
  { city: 'Indore', country: 'India', code: 'IDR' },
  { city: 'Thane', country: 'India', code: 'THN' },
  { city: 'Bhopal', country: 'India', code: 'BHO' },
  { city: 'Visakhapatnam', country: 'India', code: 'VTZ' },
  { city: 'Pimpri-Chinchwad', country: 'India', code: 'PNQ' },
  { city: 'Patna', country: 'India', code: 'PAT' },
  { city: 'Vadodara', country: 'India', code: 'BDQ' },
  { city: 'Ghaziabad', country: 'India', code: 'DEL' },
  { city: 'Ludhiana', country: 'India', code: 'LUH' },
  { city: 'Agra', country: 'India', code: 'AGR' },
  { city: 'Nashik', country: 'India', code: 'ISK' },
  { city: 'Faridabad', country: 'India', code: 'DEL' },
  { city: 'Meerut', country: 'India', code: 'MER' },
  { city: 'Rajkot', country: 'India', code: 'RAJ' },
  { city: 'Kalyan-Dombivli', country: 'India', code: 'BOM' },
  { city: 'Vasai-Virar', country: 'India', code: 'BOM' },
  { city: 'Varanasi', country: 'India', code: 'VNS' },
  { city: 'Srinagar', country: 'India', code: 'SXR' },
  { city: 'Aurangabad', country: 'India', code: 'IXU' },
  { city: 'Dhanbad', country: 'India', code: 'DBD' },
  { city: 'Amritsar', country: 'India', code: 'ATQ' },
  { city: 'Navi Mumbai', country: 'India', code: 'BOM' },
  { city: 'Allahabad', country: 'India', code: 'IXD' },
  { city: 'Ranchi', country: 'India', code: 'IXR' },
  { city: 'Howrah', country: 'India', code: 'CCU' },
  { city: 'Jabalpur', country: 'India', code: 'JLR' },
  { city: 'Gwalior', country: 'India', code: 'GWL' },
  { city: 'Vijayawada', country: 'India', code: 'VGA' },
  { city: 'Jodhpur', country: 'India', code: 'JDH' },
  { city: 'Raipur', country: 'India', code: 'RPR' },
  { city: 'Kota', country: 'India', code: 'KTU' },
  { city: 'Guwahati', country: 'India', code: 'GAU' },
  { city: 'Chandigarh', country: 'India', code: 'IXC' },
  { city: 'Solapur', country: 'India', code: 'SSE' },
  { city: 'Hubli', country: 'India', code: 'HBX' },
  { city: 'Bareilly', country: 'India', code: 'BEK' },
  { city: 'Moradabad', country: 'India', code: 'MBD' },
  { city: 'Mysore', country: 'India', code: 'MYQ' },
  { city: 'Gurgaon', country: 'India', code: 'DEL' },
  { city: 'Aligarh', country: 'India', code: 'ALH' },
  { city: 'Jalandhar', country: 'India', code: 'JLR' },
  { city: 'Tiruchirappalli', country: 'India', code: 'TRZ' },
  { city: 'Bhubaneswar', country: 'India', code: 'BBI' },
  { city: 'Salem', country: 'India', code: 'SXV' },
  { city: 'Warangal', country: 'India', code: 'WGL' },
  { city: 'Guntur', country: 'India', code: 'GNT' },
  { city: 'Bhiwandi', country: 'India', code: 'BOM' },
  { city: 'Saharanpur', country: 'India', code: 'SRE' },
  { city: 'Gorakhpur', country: 'India', code: 'GOP' },
  { city: 'Bikaner', country: 'India', code: 'BKB' },
  { city: 'Amravati', country: 'India', code: 'AMR' },
  { city: 'Noida', country: 'India', code: 'DEL' },
  { city: 'Jamshedpur', country: 'India', code: 'IXW' },
  { city: 'Bhilai', country: 'India', code: 'RPR' },
  { city: 'Cuttack', country: 'India', code: 'BBI' },
  { city: 'Firozabad', country: 'India', code: 'FBD' },
  { city: 'Kochi', country: 'India', code: 'COK' },
  { city: 'Nellore', country: 'India', code: 'NLR' },
  { city: 'Bhavnagar', country: 'India', code: 'BHU' },
  { city: 'Dehradun', country: 'India', code: 'DED' },
  { city: 'Durgapur', country: 'India', code: 'RDP' },
  { city: 'Asansol', country: 'India', code: 'ASN' },
  { city: 'Rourkela', country: 'India', code: 'RRK' },
  { city: 'Nanded', country: 'India', code: 'NDC' },
  { city: 'Kolhapur', country: 'India', code: 'KLH' },
  { city: 'Ajmer', country: 'India', code: 'KQH' },
  { city: 'Akola', country: 'India', code: 'AKD' },
  { city: 'Gulbarga', country: 'India', code: 'GBI' },
  { city: 'Jamnagar', country: 'India', code: 'JGA' },
  { city: 'Ujjain', country: 'India', code: 'UJN' },
  { city: 'Loni', country: 'India', code: 'DEL' },
  { city: 'Siliguri', country: 'India', code: 'IXB' },
  { city: 'Jhansi', country: 'India', code: 'JHS' },
  { city: 'Ulhasnagar', country: 'India', code: 'BOM' },
  { city: 'Jammu', country: 'India', code: 'IXJ' },
  { city: 'Sangli-Miraj', country: 'India', code: 'SGL' },
  { city: 'Mangalore', country: 'India', code: 'IXE' },
  { city: 'Erode', country: 'India', code: 'EDO' },
  { city: 'Belgaum', country: 'India', code: 'IXG' },
  { city: 'Ambattur', country: 'India', code: 'MAA' },
  { city: 'Tirunelveli', country: 'India', code: 'TNV' },
  { city: 'Malegaon', country: 'India', code: 'ISK' },
  { city: 'Gaya', country: 'India', code: 'GAY' },
  { city: 'Tiruppur', country: 'India', code: 'TUP' },
  { city: 'Davanagere', country: 'India', code: 'DVG' },
  { city: 'Kozhikode', country: 'India', code: 'CCJ' },
  { city: 'Akola', country: 'India', code: 'AKD' },
  { city: 'Kurnool', country: 'India', code: 'KJB' },
  { city: 'Rajpur Sonarpur', country: 'India', code: 'CCU' },
  { city: 'Bokaro', country: 'India', code: 'BKR' },
  { city: 'South Dum Dum', country: 'India', code: 'CCU' },
  { city: 'Bellary', country: 'India', code: 'BEP' },
  { city: 'Patiala', country: 'India', code: 'PAT' },
  { city: 'Gopalpur', country: 'India', code: 'GBI' },
  { city: 'Agartala', country: 'India', code: 'IXA' },
  { city: 'Bhagalpur', country: 'India', code: 'VGL' },
  { city: 'Muzaffarnagar', country: 'India', code: 'MZA' },
  { city: 'Bhatpara', country: 'India', code: 'CCU' },
  { city: 'Panihati', country: 'India', code: 'CCU' },
  { city: 'Latur', country: 'India', code: 'LTU' },
  { city: 'Dhule', country: 'India', code: 'DHU' },
  { city: 'Tirupati', country: 'India', code: 'TIR' },
  { city: 'Rohtak', country: 'India', code: 'DEL' },
  { city: 'Korba', country: 'India', code: 'KRH' },
  { city: 'Bhilwara', country: 'India', code: 'BHL' },
  { city: 'Berhampur', country: 'India', code: 'BAM' },
  { city: 'Muzaffarpur', country: 'India', code: 'MZU' },
  { city: 'Ahmednagar', country: 'India', code: 'ANG' },
  { city: 'Mathura', country: 'India', code: 'KTM' },
  { city: 'Kollam', country: 'India', code: 'KLM' },
  { city: 'Avadi', country: 'India', code: 'MAA' },
  { city: 'Kadapa', country: 'India', code: 'CDP' },
  { city: 'Anantapur', country: 'India', code: 'ATP' },
  { city: 'Kamarhati', country: 'India', code: 'CCU' },
  { city: 'Bilaspur', country: 'India', code: 'PAB' },
  { city: 'Shahjahanpur', country: 'India', code: 'SXK' },
  { city: 'Satara', country: 'India', code: 'SAT' },
  { city: 'Bijapur', country: 'India', code: 'BJP' },
  { city: 'Rampur', country: 'India', code: 'RMP' },
  { city: 'Shoreham-by-Sea', country: 'India', code: 'SSE' },
  { city: 'Chandrapur', country: 'India', code: 'CDP' },
  { city: 'Junagadh', country: 'India', code: 'JGA' },
  { city: 'Thrissur', country: 'India', code: 'TCR' },
  { city: 'Alwar', country: 'India', code: 'AWR' },
  { city: 'Bardhaman', country: 'India', code: 'BWN' },
  { city: 'Kulti', country: 'India', code: 'ASN' },
  { city: 'Kakinada', country: 'India', code: 'KAK' },
  { city: 'Nizamabad', country: 'India', code: 'NZB' },
  { city: 'Parbhani', country: 'India', code: 'PBN' },
  { city: 'Tumkur', country: 'India', code: 'TKR' },
  { city: 'Khammam', country: 'India', code: 'KMM' },
  { city: 'Ozhukarai', country: 'India', code: 'PNY' },
  { city: 'Bihar Sharif', country: 'India', code: 'PAT' },
  { city: 'Panipat', country: 'India', code: 'PPN' },
  { city: 'Darbhanga', country: 'India', code: 'DBR' },
  { city: 'Bally', country: 'India', code: 'CCU' },
  { city: 'Aizawl', country: 'India', code: 'AJL' },
  { city: 'Dewas', country: 'India', code: 'DWX' },
  { city: 'Ichalkaranji', country: 'India', code: 'KLH' },
  { city: 'Tonk', country: 'India', code: 'TON' },
  { city: 'Tiruvottiyur', country: 'India', code: 'MAA' },
  { city: 'Karaikudi', country: 'India', code: 'KKDI' },
  { city: 'Baranagar', country: 'India', code: 'CCU' },
  { city: 'Tezpur', country: 'India', code: 'TEZ' },
  { city: 'Pudukkottai', country: 'India', code: 'PDKT' },
  { city: 'Udupi', country: 'India', code: 'UDU' },
  { city: 'Jalna', country: 'India', code: 'JLN' },
  { city: 'Hosur', country: 'India', code: 'HSR' },
  { city: 'Bongaigaon', country: 'India', code: 'BNGN' },
  { city: 'Kottayam', country: 'India', code: 'KTYM' },
  { city: 'Mango', country: 'India', code: 'JSR' },
  { city: 'Shimla', country: 'India', code: 'SLV' },
  { city: 'Raichur', country: 'India', code: 'RC' },
  { city: 'Pali', country: 'India', code: 'PALI' },
  { city: 'Haldia', country: 'India', code: 'HLZ' },
  { city: 'Anantapur', country: 'India', code: 'ATP' },
  { city: 'Chandannagar', country: 'India', code: 'CCU' },
  { city: 'Maheshtala', country: 'India', code: 'CCU' },
  { city: 'Kharagpur', country: 'India', code: 'KGP' },
  { city: 'Sasaram', country: 'India', code: 'SSM' },
  { city: 'Hazaribagh', country: 'India', code: 'HZD' },
  { city: 'Bidar', country: 'India', code: 'BID' },
  { city: 'Burhanpur', country: 'India', code: 'BHP' },
  { city: 'Srikakulam', country: 'India', code: 'SKM' },
  { city: 'Munger', country: 'India', code: 'MGR' },
  { city: 'Panchkula', country: 'India', code: 'IXC' },
  { city: 'Dhanbad', country: 'India', code: 'DBD' },
  { city: 'Shimoga', country: 'India', code: 'SHM' },
  { city: 'Karaikkudi', country: 'India', code: 'KKDI' },
  { city: 'Hospet', country: 'India', code: 'HSP' },
  { city: 'Adoni', country: 'India', code: 'AD' },
  { city: 'Bhusawal', country: 'India', code: 'BSL' },
  { city: 'Hindupur', country: 'India', code: 'HDP' },
  { city: 'Adilabad', country: 'India', code: 'ADB' },
  { city: 'Ambala', country: 'India', code: 'AMB' },
  { city: 'Anakapalle', country: 'India', code: 'AKP' },
  { city: 'Bahraich', country: 'India', code: 'BRH' },
  { city: 'Bhiwani', country: 'India', code: 'BWN' },
  { city: 'Buxar', country: 'India', code: 'BXR' },
  { city: 'Chittorgarh', country: 'India', code: 'COR' },
  { city: 'Dehri', country: 'India', code: 'DEH' },
  { city: 'Fatehabad', country: 'India', code: 'FTD' },
  { city: 'Firozpur', country: 'India', code: 'FZR' },
  { city: 'Gangapur', country: 'India', code: 'GGR' },
  { city: 'Hapur', country: 'India', code: 'HPU' },
  { city: 'Harda', country: 'India', code: 'HD' },
  { city: 'Hassan', country: 'India', code: 'HAS' },
  { city: 'Hoshiarpur', country: 'India', code: 'HSR' },
  { city: 'Jind', country: 'India', code: 'JND' },
  { city: 'Kaithal', country: 'India', code: 'KLE' },
  { city: 'Karnal', country: 'India', code: 'KRL' },
  { city: 'Khargone', country: 'India', code: 'KGN' },
  { city: 'Kishangarh', country: 'India', code: 'KSG' },
  { city: 'Koderma', country: 'India', code: 'KQR' },
  { city: 'Madanapalle', country: 'India', code: 'MDL' },
  { city: 'Mahbubnagar', country: 'India', code: 'MBN' },
  { city: 'Malerkotla', country: 'India', code: 'MKT' },
  { city: 'Mandya', country: 'India', code: 'MDY' },
  { city: 'Mansa', country: 'India', code: 'MSZ' },
  { city: 'Moga', country: 'India', code: 'MGA' },
  { city: 'Morena', country: 'India', code: 'MRA' },
  { city: 'Motihari', country: 'India', code: 'MTR' },
  { city: 'Nagaon', country: 'India', code: 'NOG' },
  { city: 'Nagaur', country: 'India', code: 'NGO' },
  { city: 'Nalanda', country: 'India', code: 'NLD' },
  { city: 'Narsinghpur', country: 'India', code: 'NRG' },
  { city: 'Neemuch', country: 'India', code: 'NMH' },
  { city: 'Palakkad', country: 'India', code: 'PKD' },
  { city: 'Pilibhit', country: 'India', code: 'PBE' },
  { city: 'Poonamallee', country: 'India', code: 'MAA' },
  { city: 'Purnia', country: 'India', code: 'PRNA' },
  { city: 'Raebareli', country: 'India', code: 'RBL' },
  { city: 'Rajsamand', country: 'India', code: 'RSD' },
  { city: 'Ramnagar', country: 'India', code: 'RMR' },
  { city: 'Ranaghat', country: 'India', code: 'RHA' },
  { city: 'Ratlam', country: 'India', code: 'RTL' },
  { city: 'Rewa', country: 'India', code: 'REW' },
  { city: 'Roorkee', country: 'India', code: 'RK' },
  { city: 'Sagar', country: 'India', code: 'SGR' },
  { city: 'Saharsa', country: 'India', code: 'SHR' },
  { city: 'Samastipur', country: 'India', code: 'SPJ' },
  { city: 'Sambalpur', country: 'India', code: 'SBP' },
  { city: 'Sambhal', country: 'India', code: 'SMB' },
  { city: 'Sangrur', country: 'India', code: 'SGR' },
  { city: 'Shahdol', country: 'India', code: 'SDL' },
  { city: 'Shajapur', country: 'India', code: 'SFY' },
  { city: 'Sikar', country: 'India', code: 'SKR' },
  { city: 'Sirsa', country: 'India', code: 'SRS' },
  { city: 'Sitapur', country: 'India', code: 'STP' },
  { city: 'Sivakasi', country: 'India', code: 'SVKS' },
  { city: 'Sultanpur', country: 'India', code: 'SLN' },
  { city: 'Tarn Taran', country: 'India', code: 'TTO' },
  { city: 'Udaipur', country: 'India', code: 'UDR' },
  { city: 'Udhampur', country: 'India', code: 'UHP' },
  { city: 'Unnao', country: 'India', code: 'UNO' },
  { city: 'Vidisha', country: 'India', code: 'BHS' },
  { city: 'Wardha', country: 'India', code: 'WRD' },
  { city: 'Yamunanagar', country: 'India', code: 'YNR' },

  { city: 'Karachi', country: 'Pakistan', code: 'KHI' },
  { city: 'Lahore', country: 'Pakistan', code: 'LHE' },
  { city: 'Faisalabad', country: 'Pakistan', code: 'LYP' },
  { city: 'Rawalpindi', country: 'Pakistan', code: 'RWP' },
  { city: 'Gujranwala', country: 'Pakistan', code: 'GUJ' },
  { city: 'Peshawar', country: 'Pakistan', code: 'PEW' },
  { city: 'Multan', country: 'Pakistan', code: 'MUX' },
  { city: 'Islamabad', country: 'Pakistan', code: 'ISB' },
  { city: 'Quetta', country: 'Pakistan', code: 'UET' },
  { city: 'Bahawalpur', country: 'Pakistan', code: 'BHV' },

  { city: 'Dhaka', country: 'Bangladesh', code: 'DAC' },
  { city: 'Chittagong', country: 'Bangladesh', code: 'CGP' },
  { city: 'Khulna', country: 'Bangladesh', code: 'KHL' },
  { city: 'Rajshahi', country: 'Bangladesh', code: 'RJH' },
  { city: 'Comilla', country: 'Bangladesh', code: 'CLA' },
  { city: 'Tongi', country: 'Bangladesh', code: 'DAC' },
  { city: 'Narsingdi', country: 'Bangladesh', code: 'DAC' },
  { city: 'Rangpur', country: 'Bangladesh', code: 'RDP' },
  { city: 'Cox\'s Bazar', country: 'Bangladesh', code: 'CXB' },
  { city: 'Jessore', country: 'Bangladesh', code: 'JSR' },

  { city: 'Seoul', country: 'South Korea', code: 'ICN' },
  { city: 'Busan', country: 'South Korea', code: 'PUS' },
  { city: 'Incheon', country: 'South Korea', code: 'ICN' },
  { city: 'Daegu', country: 'South Korea', code: 'TAE' },
  { city: 'Daejeon', country: 'South Korea', code: 'CJJ' },
  { city: 'Gwangju', country: 'South Korea', code: 'KWJ' },
  { city: 'Suwon', country: 'South Korea', code: 'ICN' },
  { city: 'Ulsan', country: 'South Korea', code: 'USN' },
  { city: 'Changwon', country: 'South Korea', code: 'CJG' },
  { city: 'Seongnam', country: 'South Korea', code: 'ICN' },

  { city: 'Shanghai', country: 'China', code: 'PVG' },
  { city: 'Beijing', country: 'China', code: 'PEK' },
  { city: 'Guangzhou', country: 'China', code: 'CAN' },
  { city: 'Shenzhen', country: 'China', code: 'SZX' },
  { city: 'Tianjin', country: 'China', code: 'TSN' },
  { city: 'Wuhan', country: 'China', code: 'WUH' },
  { city: 'Dongguan', country: 'China', code: 'SZX' },
  { city: 'Chongqing', country: 'China', code: 'CKG' },
  { city: 'Chengdu', country: 'China', code: 'CTU' },
  { city: 'Nanjing', country: 'China', code: 'NKG' },

  { city: 'Jakarta', country: 'Indonesia', code: 'CGK' },
  { city: 'Surabaya', country: 'Indonesia', code: 'SUB' },
  { city: 'Bandung', country: 'Indonesia', code: 'BDO' },
  { city: 'Medan', country: 'Indonesia', code: 'KNO' },
  { city: 'Semarang', country: 'Indonesia', code: 'SRG' },
  { city: 'Palembang', country: 'Indonesia', code: 'PLM' },
  { city: 'Makassar', country: 'Indonesia', code: 'UPG' },
  { city: 'Batam', country: 'Indonesia', code: 'BTH' },
  { city: 'Pekanbaru', country: 'Indonesia', code: 'PKU' },
  { city: 'Padang', country: 'Indonesia', code: 'PDG' },

  { city: 'Manila', country: 'Philippines', code: 'MNL' },
  { city: 'Quezon City', country: 'Philippines', code: 'MNL' },
  { city: 'Davao City', country: 'Philippines', code: 'DVO' },
  { city: 'Cebu City', country: 'Philippines', code: 'CEB' },
  { city: 'Zamboanga City', country: 'Philippines', code: 'ZAM' },
  { city: 'Taguig', country: 'Philippines', code: 'MNL' },
  { city: 'Antipolo', country: 'Philippines', code: 'MNL' },
  { city: 'Pasig', country: 'Philippines', code: 'MNL' },
  { city: 'Dasmariñas', country: 'Philippines', code: 'MNL' },
  { city: 'Valenzuela', country: 'Philippines', code: 'MNL' },

  { city: 'Singapore', country: 'Singapore', code: 'SIN' },

  { city: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL' },
  { city: 'George Town', country: 'Malaysia', code: 'PEN' },
  { city: 'Johor Bahru', country: 'Malaysia', code: 'JHB' },
  { city: 'Ipoh', country: 'Malaysia', code: 'IPH' },
  { city: 'Kuching', country: 'Malaysia', code: 'KCH' },
  { city: 'Kota Kinabalu', country: 'Malaysia', code: 'BKI' },
  { city: 'Shah Alam', country: 'Malaysia', code: 'KUL' },
  { city: 'Klang', country: 'Malaysia', code: 'KUL' },
  { city: 'Petaling Jaya', country: 'Malaysia', code: 'KUL' },
  { city: 'Seremban', country: 'Malaysia', code: 'KUL' },

  { city: 'Bangkok', country: 'Thailand', code: 'BKK' },
  { city: 'Nonthaburi', country: 'Thailand', code: 'DMK' },
  { city: 'Nakhon Ratchasima', country: 'Thailand', code: 'NMA' },
  { city: 'Chiang Mai', country: 'Thailand', code: 'CNX' },
  { city: 'Hat Yai', country: 'Thailand', code: 'HDY' },
  { city: 'Pak Kret', country: 'Thailand', code: 'BKK' },
  { city: 'Phra Pradaeng', country: 'Thailand', code: 'BKK' },
  { city: 'Lampang', country: 'Thailand', code: 'LPT' },
  { city: 'Khon Kaen', country: 'Thailand', code: 'KKC' },
  { city: 'Surat Thani', country: 'Thailand', code: 'URT' },

  // Africa - continued with more countries
  { city: 'Cairo', country: 'Egypt', code: 'CAI' },
  { city: 'Alexandria', country: 'Egypt', code: 'ALY' },
  { city: 'Giza', country: 'Egypt', code: 'CAI' },
  { city: 'Port Said', country: 'Egypt', code: 'PSD' },
  { city: 'Suez', country: 'Egypt', code: 'SUZ' },
  { city: 'Luxor', country: 'Egypt', code: 'LXR' },
  { city: 'Aswan', country: 'Egypt', code: 'ASW' },
  { city: 'Asyut', country: 'Egypt', code: 'ATZ' },
  { city: 'Ismailia', country: 'Egypt', code: 'IS' },
  { city: 'Faiyum', country: 'Egypt', code: 'CAI' },

  { city: 'Lagos', country: 'Nigeria', code: 'LOS' },
  { city: 'Kano', country: 'Nigeria', code: 'KAN' },
  { city: 'Ibadan', country: 'Nigeria', code: 'IBA' },
  { city: 'Kaduna', country: 'Nigeria', code: 'KAD' },
  { city: 'Port Harcourt', country: 'Nigeria', code: 'PHC' },
  { city: 'Benin City', country: 'Nigeria', code: 'BNI' },
  { city: 'Maiduguri', country: 'Nigeria', code: 'MIU' },
  { city: 'Zaria', country: 'Nigeria', code: 'ZAR' },
  { city: 'Aba', country: 'Nigeria', code: 'ABA' },
  { city: 'Jos', country: 'Nigeria', code: 'JOS' },

  { city: 'Cape Town', country: 'South Africa', code: 'CPT' },
  { city: 'Johannesburg', country: 'South Africa', code: 'JNB' },
  { city: 'Durban', country: 'South Africa', code: 'DUR' },
  { city: 'Soweto', country: 'South Africa', code: 'JNB' },
  { city: 'Pretoria', country: 'South Africa', code: 'PRY' },
  { city: 'Port Elizabeth', country: 'South Africa', code: 'PLZ' },
  { city: 'Pietermaritzburg', country: 'South Africa', code: 'PZB' },
  { city: 'Benoni', country: 'South Africa', code: 'JNB' },
  { city: 'Tembisa', country: 'South Africa', code: 'JNB' },
  { city: 'East London', country: 'South Africa', code: 'ELS' },

  { city: 'Casablanca', country: 'Morocco', code: 'CMN' },
  { city: 'Rabat', country: 'Morocco', code: 'RBA' },
  { city: 'Fès', country: 'Morocco', code: 'FEZ' },
  { city: 'Marrakech', country: 'Morocco', code: 'RAK' },
  { city: 'Meknès', country: 'Morocco', code: 'MEK' },
  { city: 'Oujda', country: 'Morocco', code: 'OUD' },
  { city: 'Kénitra', country: 'Morocco', code: 'NNA' },
  { city: 'Agadir', country: 'Morocco', code: 'AGA' },
  { city: 'Tétouan', country: 'Morocco', code: 'TTU' },
  { city: 'Safi', country: 'Morocco', code: 'SFI' },

  { city: 'Algiers', country: 'Algeria', code: 'ALG' },
  { city: 'Oran', country: 'Algeria', code: 'ORN' },
  { city: 'Constantine', country: 'Algeria', code: 'CZL' },
  { city: 'Annaba', country: 'Algeria', code: 'AAE' },
  { city: 'Blida', country: 'Algeria', code: 'BLJ' },
  { city: 'Béjaïa', country: 'Algeria', code: 'BJA' },
  { city: 'Batna', country: 'Algeria', code: 'BLJ' },
  { city: 'Sétif', country: 'Algeria', code: 'QSF' },
  { city: 'Sidi Bel Abbès', country: 'Algeria', code: 'BFW' },
  { city: 'Biskra', country: 'Algeria', code: 'BSK' },

  { city: 'Tunis', country: 'Tunisia', code: 'TUN' },
  { city: 'Sfax', country: 'Tunisia', code: 'SFA' },
  { city: 'Sousse', country: 'Tunisia', code: 'SOU' },
  { city: 'Kairouan', country: 'Tunisia', code: 'QKN' },
  { city: 'Bizerte', country: 'Tunisia', code: 'BIZ' },
  { city: 'Gabès', country: 'Tunisia', code: 'GAE' },
  { city: 'Ariana', country: 'Tunisia', code: 'TUN' },
  { city: 'Gafsa', country: 'Tunisia', code: 'GAF' },
  { city: 'La Marsa', country: 'Tunisia', code: 'TUN' },
  { city: 'Zarzis', country: 'Tunisia', code: 'ZAR' },

  { city: 'Tripoli', country: 'Libya', code: 'TIP' },
  { city: 'Benghazi', country: 'Libya', code: 'BEN' },
  { city: 'Misrata', country: 'Libya', code: 'MRA' },
  { city: 'Tarhuna', country: 'Libya', code: 'TIP' },
  { city: 'Al Khums', country: 'Libya', code: 'TIP' },
  { city: 'Zawiya', country: 'Libya', code: 'TIP' },
  { city: 'Sabha', country: 'Libya', code: 'SEB' },
  { city: 'Sirte', country: 'Libya', code: 'SRX' },
  { city: 'Tobruk', country: 'Libya', code: 'TOB' },
  { city: 'Derna', country: 'Libya', code: 'DNF' },

  { city: 'Dakar', country: 'Senegal', code: 'DKR' },
  { city: 'Pikine', country: 'Senegal', code: 'DKR' },
  { city: 'Touba', country: 'Senegal', code: 'DKR' },
  { city: 'Thiès', country: 'Senegal', code: 'DKR' },
  { city: 'Kaolack', country: 'Senegal', code: 'KLC' },
  { city: 'Ziguinchor', country: 'Senegal', code: 'ZIG' },
  { city: 'Saint-Louis', country: 'Senegal', code: 'DKR' },
  { city: 'Diourbel', country: 'Senegal', code: 'DKR' },
  { city: 'Louga', country: 'Senegal', code: 'DKR' },
  { city: 'Tambacounda', country: 'Senegal', code: 'DKR' },

  { city: 'Addis Ababa', country: 'Ethiopia', code: 'ADD' },
  { city: 'Dire Dawa', country: 'Ethiopia', code: 'DIR' },
  { city: 'Mekelle', country: 'Ethiopia', code: 'MQX' },
  { city: 'Nazret', country: 'Ethiopia', code: 'ADD' },
  { city: 'Bahir Dar', country: 'Ethiopia', code: 'BJR' },
  { city: 'Gondar', country: 'Ethiopia', code: 'GDQ' },
  { city: 'Dese', country: 'Ethiopia', code: 'ADD' },
  { city: 'Hosaena', country: 'Ethiopia', code: 'AWA' },
  { city: 'Harar', country: 'Ethiopia', code: 'HGA' },
  { city: 'Jijiga', country: 'Ethiopia', code: 'JIJ' },

  { city: 'Nairobi', country: 'Kenya', code: 'NBO' },
  { city: 'Mombasa', country: 'Kenya', code: 'MBA' },
  { city: 'Nakuru', country: 'Kenya', code: 'NUU' },
  { city: 'Eldoret', country: 'Kenya', code: 'EDL' },
  { city: 'Kisumu', country: 'Kenya', code: 'KIS' },
  { city: 'Thika', country: 'Kenya', code: 'NBO' },
  { city: 'Malindi', country: 'Kenya', code: 'MYD' },
  { city: 'Kitale', country: 'Kenya', code: 'KTL' },
  { city: 'Garissa', country: 'Kenya', code: 'GAS' },
  { city: 'Kakamega', country: 'Kenya', code: 'GGM' },

  { city: 'Kinshasa', country: 'Democratic Republic of the Congo', code: 'FIH' },
  { city: 'Lubumbashi', country: 'Democratic Republic of the Congo', code: 'FBM' },
  { city: 'Mbuji-Mayi', country: 'Democratic Republic of the Congo', code: 'MJM' },
  { city: 'Kisangani', country: 'Democratic Republic of the Congo', code: 'FKI' },
  { city: 'Kananga', country: 'Democratic Republic of the Congo', code: 'KGA' },
  { city: 'Likasi', country: 'Democratic Republic of the Congo', code: 'LIQ' },
  { city: 'Kolwezi', country: 'Democratic Republic of the Congo', code: 'KWZ' },
  { city: 'Tshikapa', country: 'Democratic Republic of the Congo', code: 'TSH' },
  { city: 'Bukavu', country: 'Democratic Republic of the Congo', code: 'BKY' },
  { city: 'Mwene-Ditu', country: 'Democratic Republic of the Congo', code: 'MWE' },

  { city: 'Luanda', country: 'Angola', code: 'LAD' },
  { city: 'Huambo', country: 'Angola', code: 'NOV' },
  { city: 'Lobito', country: 'Angola', code: 'SDD' },
  { city: 'Benguela', country: 'Angola', code: 'BUG' },
  { city: 'Kuito', country: 'Angola', code: 'SVP' },
  { city: 'Lubango', country: 'Angola', code: 'SDD' },
  { city: 'Malanje', country: 'Angola', code: 'MEG' },
  { city: 'Namibe', country: 'Angola', code: 'MSZ' },
  { city: 'Soyo', country: 'Angola', code: 'SZA' },
  { city: 'Cabinda', country: 'Angola', code: 'CAB' },

  { city: 'Khartoum', country: 'Sudan', code: 'KRT' },
  { city: 'Omdurman', country: 'Sudan', code: 'KRT' },
  { city: 'Port Sudan', country: 'Sudan', code: 'PZU' },
  { city: 'Kassala', country: 'Sudan', code: 'KSL' },
  { city: 'El Obeid', country: 'Sudan', code: 'EBD' },
  { city: 'Nyala', country: 'Sudan', code: 'UYL' },
  { city: 'Wad Medani', country: 'Sudan', code: 'DNI' },
  { city: 'Al Qadarif', country: 'Sudan', code: 'KDX' },
  { city: 'Dongola', country: 'Sudan', code: 'DOG' },
  { city: 'Singa', country: 'Sudan', code: 'DNX' },

  { city: 'Dar es Salaam', country: 'Tanzania', code: 'DAR' },
  { city: 'Mwanza', country: 'Tanzania', code: 'MWZ' },
  { city: 'Arusha', country: 'Tanzania', code: 'ARK' },
  { city: 'Dodoma', country: 'Tanzania', code: 'DAR' },
  { city: 'Mbeya', country: 'Tanzania', code: 'MBI' },
  { city: 'Morogoro', country: 'Tanzania', code: 'DAR' },
  { city: 'Tanga', country: 'Tanzania', code: 'TGT' },
  { city: 'Kahama', country: 'Tanzania', code: 'DAR' },
  { city: 'Tabora', country: 'Tanzania', code: 'TBO' },
  { city: 'Zanzibar City', country: 'Tanzania', code: 'ZNZ' },

  { city: 'Accra', country: 'Ghana', code: 'ACC' },
  { city: 'Kumasi', country: 'Ghana', code: 'KMS' },
  { city: 'Tamale', country: 'Ghana', code: 'TML' },
  { city: 'Takoradi', country: 'Ghana', code: 'TKD' },
  { city: 'Atsiaman', country: 'Ghana', code: 'ACC' },
  { city: 'Tema', country: 'Ghana', code: 'ACC' },
  { city: 'Cape Coast', country: 'Ghana', code: 'CPT' },
  { city: 'Obuasi', country: 'Ghana', code: 'KMS' },
  { city: 'Teshie', country: 'Ghana', code: 'ACC' },
  { city: 'Madina', country: 'Ghana', code: 'ACC' },

  // South America - continued with more cities
  { city: 'São Paulo', country: 'Brazil', code: 'GRU' },
  { city: 'Rio de Janeiro', country: 'Brazil', code: 'GIG' },
  { city: 'Brasília', country: 'Brazil', code: 'BSB' },
  { city: 'Salvador', country: 'Brazil', code: 'SSA' },
  { city: 'Fortaleza', country: 'Brazil', code: 'FOR' },
  { city: 'Belo Horizonte', country: 'Brazil', code: 'CNF' },
  { city: 'Manaus', country: 'Brazil', code: 'MAO' },
  { city: 'Curitiba', country: 'Brazil', code: 'CWB' },
  { city: 'Recife', country: 'Brazil', code: 'REC' },
  { city: 'Porto Alegre', country: 'Brazil', code: 'POA' },

  { city: 'Buenos Aires', country: 'Argentina', code: 'EZE' },
  { city: 'Córdoba', country: 'Argentina', code: 'COR' },
  { city: 'Rosario', country: 'Argentina', code: 'ROS' },
  { city: 'Mendoza', country: 'Argentina', code: 'MDZ' },
  { city: 'Tucumán', country: 'Argentina', code: 'TUC' },
  { city: 'La Plata', country: 'Argentina', code: 'LPG' },
  { city: 'Mar del Plata', country: 'Argentina', code: 'MDQ' },
  { city: 'Salta', country: 'Argentina', code: 'SLA' },
  { city: 'Santa Fe', country: 'Argentina', code: 'SFN' },
  { city: 'San Juan', country: 'Argentina', code: 'UAQ' },

  { city: 'Lima', country: 'Peru', code: 'LIM' },
  { city: 'Arequipa', country: 'Peru', code: 'AQP' },
  { city: 'Trujillo', country: 'Peru', code: 'TRU' },
  { city: 'Chiclayo', country: 'Peru', code: 'CIX' },
  { city: 'Piura', country: 'Peru', code: 'PIU' },
  { city: 'Cusco', country: 'Peru', code: 'CUZ' },
  { city: 'Chimbote', country: 'Peru', code: 'CHM' },
  { city: 'Tacna', country: 'Peru', code: 'TCQ' },
  { city: 'Iquitos', country: 'Peru', code: 'IQT' },
  { city: 'Huancayo', country: 'Peru', code: 'JUL' },

  { city: 'Bogotá', country: 'Colombia', code: 'BOG' },
  { city: 'Medellín', country: 'Colombia', code: 'MDE' },
  { city: 'Cali', country: 'Colombia', code: 'CLO' },
  { city: 'Barranquilla', country: 'Colombia', code: 'BAQ' },
  { city: 'Cartagena', country: 'Colombia', code: 'CTG' },
  { city: 'Cúcuta', country: 'Colombia', code: 'CUC' },
  { city: 'Bucaramanga', country: 'Colombia', code: 'BGA' },
  { city: 'Pereira', country: 'Colombia', code: 'PEI' },
  { city: 'Santa Marta', country: 'Colombia', code: 'SMR' },
  { city: 'Ibagué', country: 'Colombia', code: 'IBE' },

  { city: 'Santiago', country: 'Chile', code: 'SCL' },
  { city: 'Puente Alto', country: 'Chile', code: 'SCL' },
  { city: 'Antofagasta', country: 'Chile', code: 'ANF' },
  { city: 'Viña del Mar', country: 'Chile', code: 'SCL' },
  { city: 'Valparaíso', country: 'Chile', code: 'SCL' },
  { city: 'Talcahuano', country: 'Chile', code: 'TAL' },
  { city: 'San Bernardo', country: 'Chile', code: 'SCL' },
  { city: 'Temuco', country: 'Chile', code: 'ZCO' },
  { city: 'Iquique', country: 'Chile', code: 'IQQ' },
  { city: 'Concepción', country: 'Chile', code: 'CCP' },

  // Oceania - continued with more cities
  { city: 'Sydney', country: 'Australia', code: 'SYD' },
  { city: 'Melbourne', country: 'Australia', code: 'MEL' },
  { city: 'Brisbane', country: 'Australia', code: 'BNE' },
  { city: 'Perth', country: 'Australia', code: 'PER' },
  { city: 'Adelaide', country: 'Australia', code: 'ADL' },
  { city: 'Gold Coast', country: 'Australia', code: 'OOL' },
  { city: 'Canberra', country: 'Australia', code: 'CBR' },
  { city: 'Newcastle', country: 'Australia', code: 'NTL' },
  { city: 'Wollongong', country: 'Australia', code: 'WOL' },
  { city: 'Logan City', country: 'Australia', code: 'BNE' },

  { city: 'Auckland', country: 'New Zealand', code: 'AKL' },
  { city: 'Wellington', country: 'New Zealand', code: 'WLG' },
  { city: 'Christchurch', country: 'New Zealand', code: 'CHC' },
  { city: 'Manurewa', country: 'New Zealand', code: 'AKL' },
  { city: 'Hamilton', country: 'New Zealand', code: 'HLZ' },
  { city: 'Tauranga', country: 'New Zealand', code: 'TRG' },
  { city: 'Lower Hutt', country: 'New Zealand', code: 'WLG' },
  { city: 'Dunedin', country: 'New Zealand', code: 'DUD' },
  { city: 'Palmerston North', country: 'New Zealand', code: 'PMR' },
  { city: 'Napier', country: 'New Zealand', code: 'NPE' },

];

// Main Hajj/Umrah destinations for TO field
const destinationCities = [
  { city: 'Mecca', country: 'Saudi Arabia', code: 'JED' },
  { city: 'Medina', country: 'Saudi Arabia', code: 'MED' },
  { city: 'Riadh', country: 'Saudi Arabia', code: 'JED' },
];

export default function FlightSearch() {
  const { t } = useTranslation();
  const [tripType, setTripType] = useState('one-way');
  const [fromLocation, setFromLocation] = useState('Casablanca, Morocco');
  const [toLocation, setToLocation] = useState('');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromFilteredLocations, setFromFilteredLocations] = useState(locations);

  // Date picker state
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  const [selectedDate, setSelectedDate] = useState<Date>(getTomorrow());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Filter locations based on search query
  const filterLocations = (query: string) => {
    if (!query.trim()) return locations;
    return locations.filter(location =>
      location.city.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase()) ||
      `${location.city}, ${location.country}`.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle location input changes
  const handleFromInputChange = (value: string) => {
    setFromLocation(value);
    setFromFilteredLocations(filterLocations(value));
    setFromDropdownOpen(true);
  };


  // Handle location selection
  const handleFromSelect = (location: typeof locations[0]) => {
    setFromLocation(`${location.city}, ${location.country}`);
    setFromDropdownOpen(false);
  };


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setFromDropdownOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setToDropdownOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Date picker helper functions
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('flights.title')}
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {t('flights.subtitle')}
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Trip Type Selectors */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { id: 'one-way', label: t('flights.trip_types.one_way') },
              { id: 'round-trip', label: t('flights.trip_types.round_trip') },
              { id: 'multi-route', label: t('flights.trip_types.multi_route') }
            ].map((type) => (
              <label key={type.id} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="tripType"
                    className="sr-only "
                    checked={tripType === type.id}
                    onChange={() => setTripType(type.id)}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    tripType === type.id 
                    ? 'border-emerald-600 bg-emerald-600' 
                    : 'border-gray-300 group-hover:border-emerald-400'
                  }`}>
                    {tripType === type.id && (
                      <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                <span className={`text-sm font-semibold transition-colors ${
                  tripType === type.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* FROM */}
            <div className="space-y-2" ref={fromRef}>
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.from')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => handleFromInputChange(e.target.value)}
                  onFocus={() => setFromDropdownOpen(true)}
                  placeholder="Type city or country"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-black placeholder-gray-400 focus:border-emerald-500 transition-all"
                />
                {fromLocation && (
                  <button
                    onClick={() => {
                      setFromLocation('');
                      setFromFilteredLocations(locations);
                    }}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

                {/* Dropdown */}
                {fromDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {fromFilteredLocations.length > 0 ? (
                      fromFilteredLocations.map((location, index) => (
                        <div
                          key={index}
                          onClick={() => handleFromSelect(location)}
                          className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{location.city}</div>
                              <div className="text-sm text-gray-500">{location.country}</div>
                            </div>
                            <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {location.code}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">
                        No locations found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* TO */}
            <div className="space-y-2" ref={toRef}>
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.to')}</label>
              <div className="relative">
                <div
                  onClick={() => setToDropdownOpen(!toDropdownOpen)}
                  className="w-full bg-white border border-gray-200 text-black rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className={toLocation ? 'text-black' : 'text-gray-400'}>
                    {toLocation || 'Select destination city'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${toDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown */}
                {toDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    {destinationCities.map((city, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setToLocation(`${city.city}, ${city.country}`);
                          setToDropdownOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{city.city}</div>
                            <div className="text-sm text-gray-500">{city.country}</div>
                          </div>
                          <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            {city.code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DEPARTURE DATE */}
            <div className="space-y-2" ref={dateRef}>
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.departure')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={formatDate(selectedDate)}
                  readOnly
                  onClick={() => {
                    setCurrentMonth(selectedDate.getMonth());
                    setCurrentYear(selectedDate.getFullYear());
                    setIsCalendarOpen(!isCalendarOpen);
                  }}
                  className="w-full bg-white border border-gray-200 text-black placeholder-gray-400 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />

                {/* Calendar Dropdown */}
                {isCalendarOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => handleMonthChange('prev')}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="font-semibold text-gray-900">
                        {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                      <button
                        onClick={() => handleMonthChange('next')}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before the first day of the month */}
                      {Array.from({ length: getFirstDayOfMonth(currentYear, currentMonth) }).map((_, index) => (
                        <div key={`empty-${index}`} className="h-8"></div>
                      ))}

                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }).map((_, dayIndex) => {
                        const day = dayIndex + 1;
                        const date = new Date(currentYear, currentMonth, day);
                        const isSelected = selectedDate.toDateString() === date.toDateString();
                        const isToday = new Date().toDateString() === date.toDateString();
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(0, 0, 0, 0);
                        const isBeforeTomorrow = date < tomorrow;

                        return (
                          <button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            disabled={isBeforeTomorrow}
                            className={`h-8 w-8 text-sm rounded-lg transition-colors ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : isToday
                                ? 'text-gray-300 cursor-not-allowed'
                                : isBeforeTomorrow
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'hover:bg-gray-100 text-gray-900'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TRAVELERS */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/60 ml-1">{t('flights.passengers')}</label>
              <div className="relative">
                <select className="w-full bg-white text-black border border-gray-200 text-bl  rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none cursor-pointer">c
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>Family (3+)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex justify-center mb-10">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only text-black placeholder-gray-400 peer" />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-emerald-900 peer-checked:border-emerald-900 transition-all flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-900">Include nearby airports</span>
            </label>
          </div>

          {/* Search Button */}
          <button className="w-full py-4.5 bg-[#2D4A31] hover:bg-[#1f3322] text-white rounded-xl font-bold flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg">
            <Search className="w-5 h-5" />
            <span className="text-lg">{t('flights.search_flights')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}