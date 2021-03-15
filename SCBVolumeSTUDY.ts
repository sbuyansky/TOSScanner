# inputs
# small_lookback is short window average to compare to the large window average defined by large_lookback
input small_lookback = 3;
input large_lookback = 10;
# threshold for alerting for percentage volume change
input volume_change_threshold = 10;

def total_lookback = small_lookback + large_lookback;

# calculate then volume of the total_lookback minus the small_lookback
# then divide by large lookback to get the volume of the large_lookback lookback window
# to get the average of the large_lookback window shifted by the small_lookback window
def avgVolumeLargeLookback = (Sum(volume, total_lookback) - Sum(volume, small_lookback)) / large_lookback;

def avgVolumeSmallLookback = Average(volume, small_lookback);

# calculate the percentage change of the large_lookback to the small_lookback
def percentageChange = (avgVolumeSmallLookback - avgVolumeLargeLookback) / AbsValue(avgVolumeLargeLookback) * 100;

def volumeChangeCondition = percentageChange >= volume_change_threshold;

# price check
def avgPriceLargeLookback = (Sum(close, total_lookback) - Sum(close, small_lookback)) / large_lookback;

def avgPriceSmallLookback = Average(close, small_lookback);

def priceChangeCondition = avgPriceSmallLookback >  avgPriceLargeLookback;

plot Data = volumeChangeCondition and priceChangeCondition;