from kafka import KafkaProducer
from kafka import KafkaConsumer
import time
import numpy
import json
from matplotlib import style
import matplotlib.animation as animation
import matplotlib.pyplot as plt

'''
-------------- CONSUMER --------------
'''
consumer = KafkaConsumer('19365', bootstrap_servers='147.182.206.35:9092')

temp = []
moist = []
wind = {'N': 0, 'NW': 0, 'W': 0, 'SW': 0, 'S': 0, 'SE': 0, 'E': 0, 'NE': 0}

'''
The json is loaded
Continues to print the values of json
Live values are plotted
The wind value is increased 
3 different axes are plotted
'''
for message in consumer:
        #Load json
        jsonValues = json.loads(message.value)

        print("Payload: ")
        print("Temp: ", jsonValues['temp']/100)
        print("Moist: ", jsonValues['moist'])
        print("Wind: ", jsonValues['wind'])
        print()

        temp.append(jsonValues['temp']/100)
        moist.append(jsonValues['moist'])

        wind[jsonValues['wind']] += 1


        fig, (ax1, ax2, ax3) = plt.subplots(3, 1)

        #Graph
        fig.set_size_inches(10, 10)
        ax1.set_title('Temperature')
        ax2.set_title('Relative Moisture')
        ax3.set_title('Wind Direction')
        ax1.plot(temp)
        ax2.plot(moist)
        ax3.bar(wind.keys(), wind.values())
        plt.show()


'''
-------------- PRODUCER --------------
'''

producer = KafkaProducer(bootstrap_servers='147.182.206.35:9092')

def tempSensor():
        temp = round(float(numpy.random.uniform(0, 100.00)),2)
        return temp

def simulationRelativaMoisture():
        moist = int(numpy.random.uniform(0, 100))
        return moist

def simulation():
        directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']
        wind = numpy.random.choice(directions)

        return wind

def convertToBits(s):
    result = []
    for c in s:
        bits = bin(ord(c))[2:]
        bits = '00000000'[len(bits):] + bits
        print(bits)
        result.extend([int(b) for b in bits])
    return result

def encodeData(temp, moist, wind):
        print("Bit distribution: ")
        print("Temp: ",len("{0:b}".format(int(temp*100))))
        print("Moist: ",len("{0:b}".format(moist)))
        print("Direction: ", len(wind.encode('utf-16')) + 1)
        print("Total: ", len("{0:b}".format(int(temp*100))) + len("{0:b}".format(moist)) + (len(wind.encode('utf-8')) + 1))

        data = {
                'temp': int(temp*100),
                'moist': moist,
                'wind': wind
        }
        return data


while True:
        temp = tempSensor()
        wind = simulation()
        moist = simulationRelativaMoisture()

        data = encodeData(temp, moist, wind)

        jsonValues = json.dumps(data)

        print()
        print("Payload:")
        print(jsonValues)

        #Send to kafka
        producer.send('19365', jsonValues.encode('utf-8'))

        time.sleep(3)
