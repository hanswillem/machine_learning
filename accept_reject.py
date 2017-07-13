# accept-reject method

import random

def pick(d):
    while True:
        # get a random item and it's probability from the dictionary
        item = random.choice(list(d.keys()))
        p = d[item]

        # now pick a random number between 0 and 1
        # if the random number is lower than the probability of the item, then accept the item and return it
        if random.random() < p:
            return item


myDict = {'banana' : .9, 'apple' : .5, 'pear' : .1}


print(pick(myDict))
