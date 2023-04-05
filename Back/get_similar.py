
def get_similar(index_, path):
  '''
  получает ИНН в виде индекса
  отбирает все компании с такимже значением в колонке activity
  нормализует значения колонок мин-мах скайлером от 0 до 1
  считает расстояние между компаниями
  сортирует индексы компаний по увеличению расстояния между нимим
  отдаёт отсортированные индексы
  '''


  import pandas as pd
  from numpy.linalg import norm

  df = pd.read_csv(path, index_col="inn", parse_dates=["create_date", "reg_date", "last_tender_date"])

  similar_weight_dict = {"geo_lat":15,  # веса
                       "geo_lon":15,
                       "reg_date": 0.5,
                       "create_date":0.5,
                       "last_tender_date":0.5,
                       }
  
  
  normalize_drop_list = []

  # отбираем компании с одинаковой деятельностью
  normalize_df = df[df.activity == df.loc[index_, 'activity']]#.drop(normalize_drop_list, axis=1)
  
  def normalize(seq):
    if seq.dtype == "bool" :
      seq = seq.astype(int)
    elif type(seq.iloc[0]) == str:
      normalize_drop_list.append(seq.name)
      return seq
    return (seq - seq.min()) / (seq.max() - seq.min())
  
  normalize_df = normalize_df.apply(normalize)

  # убираем колонки со строками
  normalize_df = normalize_df.drop(normalize_drop_list, axis=1)
  
  # умножаем на веса
  for key in similar_weight_dict.keys():
    normalize_df[key] *= similar_weight_dict[key]

  #считаем расстояние 
  normalize_df["dist"] = norm(normalize_df - normalize_df.loc[index_],axis=1)
  #сортируем по расстоянию
  
  return normalize_df.sort_values("dist").index.to_numpy()
